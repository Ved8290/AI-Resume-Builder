import React, { useContext, useState } from 'react';
import ResumeContext from '../../../src/Context/ResumeContext';
import { motion } from 'framer-motion';

const EducationForm = () => {
  const { resumeinfo, setResumeinfo } = useContext(ResumeContext);
  const [education, setEducation] = useState(resumeinfo.education || []);

  const handleChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
    setResumeinfo((prev) => ({ ...prev, education: updated }));
  };

  const addEducation = () => {
    const newEntry = {
      institution: '',
      area: '',
      degree: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };

    const updated = [...education, newEntry];
    setEducation(updated);
    setResumeinfo((prev) => ({ ...prev, education: updated }));
  };

  const removeEducation = (index) => {
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated);
    setResumeinfo((prev) => ({ ...prev, education: updated }));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-2xl mt-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Education</h2>

      {education.map((edu, index) => (
        <div key={index} className="mb-10 bg-gray-50 p-6 rounded-xl shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleChange(index, 'institution', e.target.value)}
                placeholder="e.g., University of California, Berkeley"
                className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
              <input
                type="text"
                value={edu.area}
                onChange={(e) => handleChange(index, 'area', e.target.value)}
                placeholder="e.g., Computer Science"
                className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleChange(index, 'degree', e.target.value)}
                placeholder="e.g., Bachelor of Science"
                className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                placeholder="e.g., 3.8"
                className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="month"
                value={edu.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="month"
                value={edu.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => removeEducation(index)}
              className="text-red-500 text-sm hover:underline"
            >
              Remove this education
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={addEducation}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          + Add Education
        </button>
      </div>
    </motion.section>
  );
};

export default EducationForm;
