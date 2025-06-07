import React, { useContext, useState, useEffect } from 'react';
import ResumeContext from '../../../src/Context/ResumeContext';
import { motion } from 'framer-motion';

const InterestsForm = () => {
  const { resumeinfo, setResumeinfo } = useContext(ResumeContext);
  const [interests, setInterests] = useState(resumeinfo.interests || []);

  useEffect(() => {
    setInterests(resumeinfo.interests || []);
  }, [resumeinfo.interests]);

  const updateInterest = (index, value) => {
    const updated = [...interests];
    updated[index] = value;
    setInterests(updated);
    setResumeinfo((prev) => ({ ...prev, interests: updated }));
  };

  const addInterest = () => {
    const updated = [...interests, ''];
    setInterests(updated);
    setResumeinfo((prev) => ({ ...prev, interests: updated }));
  };

  const removeInterest = (index) => {
    const updated = interests.filter((_, i) => i !== index);
    setInterests(updated);
    setResumeinfo((prev) => ({ ...prev, interests: updated }));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-2xl mt-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Interests</h2>

      {interests.map((interest, index) => (
        <div
          key={index}
          className="mb-6 bg-gray-50 p-4 rounded-xl shadow-sm border flex items-center gap-4"
        >
          <input
            type="text"
            value={interest}
            onChange={(e) => updateInterest(index, e.target.value)}
            placeholder="Interest"
            className="flex-grow px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => removeInterest(index)}
            className="text-red-500 text-sm hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={addInterest}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
          type="button"
        >
          + Add Interest
        </button>
      </div>
    </motion.section>
  );
};

export default InterestsForm;
