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

    const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleAboutChange = (e)=>{
    setAbout(e.target.value);
  }

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
    const response = await axios.post("http://localhost:8000/api/portfolio", {
      userId,
      title,
      projectCategorise: selectedCategories,
      portfolio: imageUrl,
      about,
    });

    alert("Project saved to database!");
    closeModal();
  } catch (error) {
    console.error("Error:", error.message);
    alert("Something went wrong!");
  }
};



  return (
    <div>
      {/* Show upload button if no file is selected */}
      {!isFileSelected && (
        <div className='w-full p-2 h-[300px] rounded-md shadow-lg'>
          <div className='w-full h-full border-2 border-black flex flex-col justify-center items-center'>
            <div
              className='w-[60px] h-[60px] bg-blue-300 rounded-full flex justify-center items-center cursor-pointer'
              onClick={handleIconClick} // ✅ Clicking opens file input
            >
              <FaPlus className='text-white text-2xl' />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange} // ✅ Only Select, No Upload
              />
            </div>

          </div>
        </div>
      )}

      {/* Modal for file selection confirmation */}
      {isFileSelected && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white shadow-lg w-full max-w-[90%] sm:max-w-[90%] md:max-w-[800px] lg:max-w-[1000px] p-4 rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Image Preview */}
              <div className="w-full shadow-lg md:w-[35%] h-[300px] mx-1 mb-4 md:mb-0 flex items-center justify-center">

                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Selected File"
                    className="w-full rounded-lg shadow-lg h-full object-cover"
                  />
                )}
              </div>

              {/* Form Inputs */}
              <div className="w-full md:w-[65%] p-2">
                <h1 className="my-1 text-lg">Project Title</h1>
                <input
        type="text"
        className="w-full border border-gray-500 p-2 mb-4"
        placeholder="Enter project title"
        value={title}
        onChange={handleTitleChange}
      />

                <h1 className="mt-4 mx-5 text-lg">How Would You Categorize This Project?</h1>
                <div className="flex flex-wrap justify-between">

{['Graphic Design', 'Web Development', 'App Development', 'UI/UX Design', 'Content Writing', 'SEO'].map((category, index) => (
  <div key={index} className="w-full shadow-lg rounded-md sm:w-1/3 p-1 flex items-center">
    <div className="w-full p-2 flex items-center">
      <input
        type="checkbox"
        className="mx-2"
        onChange={() => handleCategoryChange(category)}
        checked={selectedCategories.includes(category)}
      />
      <label className="sm:text-[15px] lg:text-[15px]">{category}</label>
    </div>
  </div>
))}
<div className="mt-4 w-full">
  <label className="block text-lg font-semibold mb-2 text-gray-700">
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
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-between">
              <button className="bg-white text-black px-4 py-2 rounded-lg border border-gray-500" onClick={closeModal}>
                Cancel
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg" onClick={handleUploadProject}>
                Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Show Uploaded Image after Cloudinary Upload */}
      {uploadedImageUrl && (
        <div className="mt-4 text-center">
          <h2 className="text-lg font-semibold">Uploaded Image</h2>
          <img src={uploadedImageUrl} alt="Uploaded" className="w-32 h-32 rounded-lg mx-auto" />
        </div>
      )}
    </div>
  );
}

export default Freelancer2;
