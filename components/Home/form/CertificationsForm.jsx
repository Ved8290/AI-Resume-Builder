import React, { useContext, useState, useEffect } from 'react';
import ResumeContext from '../../../src/Context/ResumeContext';
import { motion } from 'framer-motion';

const CertificationsForm = () => {
  const { resumeinfo, setResumeinfo } = useContext(ResumeContext);
  const [certs, setCerts] = useState(resumeinfo.certifications || []);

  useEffect(() => {
    setCerts(resumeinfo.certifications || []);
  }, [resumeinfo.certifications]);

  const handleChange = (index, field, value) => {
    const updated = [...certs];
    updated[index][field] = value;
    setCerts(updated);
    setResumeinfo(prev => ({ ...prev, certifications: updated }));
  };

  const addCert = () => {
    const updated = [...certs, { title: '', issuer: '', date: '' }];
    setCerts(updated);
    setResumeinfo(prev => ({ ...prev, certifications: updated }));
  };

  const removeCert = (index) => {
    const updated = certs.filter((_, i) => i !== index);
    setCerts(updated);
    setResumeinfo(prev => ({ ...prev, certifications: updated }));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-2xl mt-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Certifications</h2>

      {certs.map((cert, i) => (
        <div
          key={i}
          className="mb-6 bg-gray-50 p-6 rounded-xl shadow-sm border flex flex-col space-y-4"
        >
          <div className="flex justify-between items-center">
            <label className="text-xl font-semibold text-gray-700">Certification #{i + 1}</label>
            <button
              onClick={() => removeCert(i)}
              className="text-red-500 text-sm hover:underline"
              type="button"
            >
              Remove
            </button>
          </div>

          <input
            type="text"
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Title"
            value={cert.title}
            onChange={(e) => handleChange(i, 'title', e.target.value)}
          />
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Issuer"
            value={cert.issuer}
            onChange={(e) => handleChange(i, 'issuer', e.target.value)}
          />
          <input
            type="month"
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={cert.date}
            onChange={(e) => handleChange(i, 'date', e.target.value)}
          />
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={addCert}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
          type="button"
        >
          + Add Certification
        </button>
      </div>
    </motion.section>
  );
};

export default CertificationsForm;
