import React, { useContext, useState, useEffect } from 'react';
import ResumeContext from '../../../src/Context/ResumeContext';
import { motion } from 'framer-motion';

const SkillsForm = () => {
  const { resumeinfo, setResumeinfo } = useContext(ResumeContext);
  const [skills, setSkills] = useState(resumeinfo.skills || []);

  useEffect(() => {
    setSkills(resumeinfo.skills || []);
  }, [resumeinfo.skills]);

  const handleChangeSkillName = (index, value) => {
    const updated = [...skills];
    updated[index].name = value;
    setSkills(updated);
    setResumeinfo((prev) => ({ ...prev, skills: updated }));
  };

  const handleChangeKeyword = (skillIndex, keywordIndex, value) => {
    const updated = [...skills];
    updated[skillIndex].keywords[keywordIndex] = value;
    setSkills(updated);
    setResumeinfo((prev) => ({ ...prev, skills: updated }));
  };

  const addSkillCategory = () => {
    const updated = [...skills, { name: '', keywords: [''] }];
    setSkills(updated);
    setResumeinfo((prev) => ({ ...prev, skills: updated }));
  };

  const addKeyword = (skillIndex) => {
    const updated = [...skills];
    updated[skillIndex].keywords.push('');
    setSkills(updated);
    setResumeinfo((prev) => ({ ...prev, skills: updated }));
  };

  const removeSkillCategory = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
    setResumeinfo((prev) => ({ ...prev, skills: updated }));
  };

  const removeKeyword = (skillIndex, keywordIndex) => {
    const updated = [...skills];
    updated[skillIndex].keywords = updated[skillIndex].keywords.filter((_, i) => i !== keywordIndex);
    setSkills(updated);
    setResumeinfo((prev) => ({ ...prev, skills: updated }));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-2xl mt-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Skills</h2>

      {skills.map((skill, skillIndex) => (
        <div
          key={skillIndex}
          className="mb-8 bg-gray-50 p-6 rounded-xl shadow-sm border"
        >
          <div className="flex justify-between items-center mb-4">
            <label className="block text-xl font-semibold text-gray-700">Skill Category</label>
            <button
              onClick={() => removeSkillCategory(skillIndex)}
              className="text-red-500 text-sm hover:underline"
              type="button"
            >
              Remove Category
            </button>
          </div>

          <input
            type="text"
            value={skill.name}
            onChange={(e) => handleChangeSkillName(skillIndex, e.target.value)}
            placeholder="e.g., Programming Languages"
            className="w-full px-4 py-2 mb-4 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />

          <div>
            <label className="block text-md font-medium text-gray-600 mb-2">Keywords</label>
            {skill.keywords.map((keyword, keywordIndex) => (
              <div key={keywordIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => handleChangeKeyword(skillIndex, keywordIndex, e.target.value)}
                  placeholder="Keyword"
                  className="flex-grow px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeKeyword(skillIndex, keywordIndex)}
                  className="ml-3 text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              onClick={() => addKeyword(skillIndex)}
              type="button"
              className="mt-2 text-blue-600 hover:underline text-sm"
            >
              + Add Keyword
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={addSkillCategory}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
          type="button"
        >
          + Add Skill Category
        </button>
      </div>
    </motion.section>
  );
};

export default SkillsForm;
