import React, { useEffect, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa'; // Importing plus icon from react-icons
import axios from 'axios';
function Freelancer2() {
  const fileInputRef = useRef(null);
  const [title,setTitle] = useState(null);
  const [about,setAbout] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // ✅ Store uploaded image URL
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [url,setUrl]=useState(null)
    const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleAboutChange = (e)=>{
    setAbout(e.target.value);
  }
  const handleUrlChange = (e) => setUrl(e.target.value);


  // ✅ Log selected file for debugging
  useEffect(() => {
    if (selectedFile) {
      console.log('File selected:', selectedFile.name);
    }
  }, [selectedFile]);

  const handleIconClick = () => {
    fileInputRef.current.click(); // ✅ Open file selection
  };

  // ✅ Only Select File, Don't Upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file); // ✅ Save file for later upload
    setImagePreview(URL.createObjectURL(file)); // ✅ Show preview before upload
    setIsFileSelected(true);
  };

  const closeModal = () => {
    setIsFileSelected(false);
    setSelectedFile(null);
    setImagePreview(null);
  };


  const [selectedCategories, setSelectedCategories] = useState([]); // ⬅️ new state

const handleCategoryChange = (category) => {
  setSelectedCategories((prev) =>
    prev.includes(category)
      ? prev.filter((item) => item !== category)
      : [...prev, category]
  );
};

const userId= localStorage.getItem('_id');
console.log(userId);

const handleUploadProject = async () => {
if (!selectedFile || !title || selectedCategories.length === 0 || !about || !userId) {
  alert("Please fill all fields before publishing!");
  return;
}

  const data = new FormData();
  data.append("file", selectedFile);
  data.append("upload_preset", "Upload Project");
  data.append("cloud_name", "dvnrzuumg");

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/dvnrzuumg/image/upload", {
      method: "POST",
      body: data,
    });

    if (!res.ok) throw new Error("Failed to upload image");

    const result = await res.json();
    const imageUrl = result.secure_url;
    setUploadedImageUrl(imageUrl);

    // Save to backend
    const response = await axios.post("https://wabbit.onrender.com/api/portfolio", {
      userId,
      title,
      projectCategorise: selectedCategories,
      portfolio: imageUrl,
      about,
      url,
    });

    alert("Project saved to database!");
    closeModal();
  } catch (error) {
    console.error("Error:", error.message);
    alert("Something went wrong!");
  }
};



  return (
<div className="w-full">
  {/* Upload Placeholder */}
  {!isFileSelected && (
    <div className="w-full p-2 h-[300px] rounded-md shadow-lg">
      <div className="w-full h-full border-2 border-dashed border-gray-400 flex flex-col justify-center items-center bg-gray-50">
        <div
          className="w-[60px] h-[60px] bg-blue-500 rounded-full flex justify-center items-center cursor-pointer"
          onClick={handleIconClick}
        >
          <FaPlus className="text-white text-2xl" />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <p className="mt-2 text-gray-600 text-sm">Click to select a file</p>
      </div>
    </div>
  )}

  {/* Modal */}
  {isFileSelected && (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white shadow-lg w-full max-w-6xl rounded-lg p-4 overflow-auto max-h-[95vh]">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Side - Image & URL */}
          <div className="w-full md:w-[35%] flex flex-col shadow-md rounded-lg p-4 bg-gray-50">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected File"
                className="w-full h-64 object-cover rounded-md shadow-md mb-4"
              />
            )}
            <div>
              <label className="block text-base font-semibold mb-2 text-gray-800">
                🔗 Enter Your Video or Image URL
              </label>
              <input
                type="url"
                className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="https://example.com/project"
                value={url}
                onChange={handleUrlChange}
              />
            </div>
          </div>

          {/* Right Side - Form Inputs */}
          <div className="w-full md:w-[65%]">
            <div className="mb-4">
              <label className="block text-base font-semibold mb-2">📌 Project Title</label>
              <input
                type="text"
                className="w-full border border-gray-400 p-2 rounded-md"
                placeholder="Enter project title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-base font-semibold mb-2">📂 Project Categories</label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Graphic Design",
                  "Web Development",
                  "App Development",
                  "UI/UX Design",
                  "Content Writing",
                  "SEO",
                ].map((category, index) => (
                  <label
                    key={index}
                    className="flex items-center w-full sm:w-[48%] md:w-[30%] bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-base font-semibold mb-2">
                ✍️ Write About Yourself <span className="text-sm text-gray-500">(100–200 words)</span>
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Tell us about your experience, skills, and what makes you unique..."
                rows={6}
                value={about}
                onChange={handleAboutChange}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-between">
          <button
            className="bg-white border border-gray-500 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            onClick={handleUploadProject}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Uploaded Image View */}
  {uploadedImageUrl && (
    <div className="mt-6 text-center">
      <h2 className="text-lg font-semibold mb-2">✅ Uploaded Image</h2>
      <img src={uploadedImageUrl} alt="Uploaded" className="w-32 h-32 rounded-md mx-auto shadow-md" />
    </div>
  )}
</div>

  );
}

export default Freelancer2;
