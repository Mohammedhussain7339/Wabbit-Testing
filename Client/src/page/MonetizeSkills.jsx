import React,{useState} from 'react'
import Navbar from '../components/Home/Navbar/Navbar'
import Footer from '../components/Home/Footer'
import Monetizebg from "../assets/monetizeskills.jpg"
function MonetizeSkills() {
      const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    category: '',
    experience: '',
    portfolio: '',
  });

  const categories = [
    'Video Editor',
    'Photo Editor',
    'UGC Creator',
    'MockUp',
    'Web Developer',
    'Graphic Designer',
    'Ui/Ux Designer',
    'Digital Invitation',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace with API call or other logic
  };

  return (
    <>
      <Navbar/>
    <div className='w-full h-full flex justify-center items-center  '  style={{
    backgroundImage: `url(white,black)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
      <main>
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl  p-6 rounded-lg shadow-lg space-y-5"
      >
        <h1 className="text-3xl font-bold text-center">Please provide the following details</h1>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Mail Id"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <label className="block font-semibold">
          Which category best describes the services you offer as a freelancer?
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="text"
          name="experience"
          placeholder="How many years of experience do you have?"
          value={formData.experience}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="url"
          name="portfolio"
          placeholder="Portfolio link (if any)"
          value={formData.portfolio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>

      </main>
    </div>
      <Footer/>
    </>
  )
}

export default MonetizeSkills
