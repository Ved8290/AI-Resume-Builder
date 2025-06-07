import React, { useContext, useState, useEffect } from 'react';
import ResumeContext from '../../../src/Context/ResumeContext';
import { motion } from 'framer-motion';

const LanguagesForm = () => {
  const { resumeinfo, setResumeinfo } = useContext(ResumeContext);
  const [languages, setLanguages] = useState(resumeinfo.languages || []);

  useEffect(() => {
    setLanguages(resumeinfo.languages || []);
  }, [resumeinfo.languages]);

  const handleChange = (index, field, value) => {
    const updated = [...languages];
    updated[index][field] = value;
    setLanguages(updated);
    setResumeinfo((prev) => ({ ...prev, languages: updated }));
  };

  const addLanguage = () => {
    const updated = [...languages, { language: '', fluency: '' }];
    setLanguages(updated);
    setResumeinfo((prev) => ({ ...prev, languages: updated }));
  };

  const removeLanguage = (index) => {
    const updated = languages.filter((_, i) => i !== index);
    setLanguages(updated);
    setResumeinfo((prev) => ({ ...prev, languages: updated }));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-2xl mt-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Languages</h2>

      {languages.map((lang, index) => (
        <div
          key={index}
          className="mb-8 bg-gray-50 p-6 rounded-xl shadow-sm border"
        >
          <div className="flex justify-between items-center mb-4">
            <label className="block text-xl font-semibold text-gray-700">Language</label>
            <button
              onClick={() => removeLanguage(index)}
              className="text-red-500 text-sm hover:underline"
              type="button"
            >
              Remove Language
            </button>
          </div>

          <input
            type="text"
            value={lang.language}
            onChange={(e) => handleChange(index, 'language', e.target.value)}
            placeholder="e.g., English"
            className="w-full px-4 py-2 mb-4 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />

          <label className="block text-md font-medium text-gray-600 mb-2">Fluency</label>
          <input
            type="text"
            value={lang.fluency}
            onChange={(e) => handleChange(index, 'fluency', e.target.value)}
            placeholder="e.g., Native, Fluent"
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={addLanguage}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
          type="button"
        >
          + Add Language
        </button>
      </div>
    </motion.section>
  );
};

export default LanguagesForm;
