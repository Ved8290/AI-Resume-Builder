import React, { useContext, useState } from 'react';
import ResumeContext from '../../src/Context/ResumeContext';
import CustomEditor from './CustomTextEditor';
import { motion } from 'framer-motion';

const ExperienceForm = () => {
  const { resumeinfo, setResumeinfo } = useContext(ResumeContext);
  const [experience, setExperience] = useState(resumeinfo.experience || []);

  const handleChange = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;

    if (field === 'currentlyWorking' && value === true) {
      updated[index].endDate = '';
    }

    setExperience(updated);
    setResumeinfo((prev) => ({ ...prev, experience: updated }));
  };

  const addExperience = () => {
   const newEntry = {
  company: '',
  role: '',
  startDate: '',
  endDate: '',
  description: '', 
  currentlyWorking: false,
};

    const updated = [...experience, newEntry];
    setExperience(updated);
    setResumeinfo((prev) => ({ ...prev, experience: updated }));
  };

  const removeExperience = (index) => {
    const updated = experience.filter((_, i) => i !== index);
    setExperience(updated);
    setResumeinfo((prev) => ({ ...prev, experience: updated }));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-2xl  mt-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Work Experience</h2>

      {experience.map((exp, index) => (
        <div key={index} className="mb-10 bg-gray-50 p-6 rounded-xl shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input required
                type="text"
                value={exp.company}
                onChange={(e) => handleChange(index, 'company', e.target.value)}
                placeholder="e.g., Tata Consultancy Services"
                className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role / Title</label>
              <input
                type="text" required
                value={exp.role}
                onChange={(e) => handleChange(index, 'role', e.target.value)}
                placeholder="e.g., Frontend Developer"
                className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date" required
                value={exp.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">End Date</label>
                <label className="flex items-center text-sm text-gray-600 gap-2">
                  <input required
                    type="checkbox"
                    checked={exp.currentlyWorking}
                    onChange={(e) => handleChange(index, 'currentlyWorking', e.target.checked)}
                    className="rounded"
                  />
                  I currently work here
                </label>
              </div>
              <input required
                type="date"
                value={exp.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                disabled={exp.currentlyWorking}
                className={`w-full px-4 py-2 border rounded-xl shadow-sm ${
                  exp.currentlyWorking ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
         <CustomEditor 
  value={exp.description}
  onChange={(e) => handleChange(index, 'description', e.target.value)}
/>


          </div>

          <div className="flex justify-end">
            <button
              onClick={() => removeExperience(index)}
              className="text-red-500 text-sm hover:underline"
            >
              Remove this experience
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={addExperience}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          + Add Experience
        </button>
      </div>
    </motion.section>
  );
};

export default ExperienceForm;
