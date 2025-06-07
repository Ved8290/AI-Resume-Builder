import React, { useContext, useState } from 'react';
import ResumeContext from '../../../src/Context/ResumeContext';
import { motion } from 'framer-motion';
import { aimodel } from '../../../aiModel';
import ExperienceForm from '../ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import CertificationsForm from './CertificationsForm';
import LanguagesForm from './LanguagesForm';
import InterestsForm from './InterestsForm';

const professionalColors = [
  { label: 'Blue', value: '#2563EB' },
  { label: 'Indigo', value: '#4F46E5' },
  { label: 'Emerald', value: '#10B981' },
  { label: 'Amber', value: '#F59E0B' },
  { label: 'Rose', value: '#F43F5E' },
  { label: 'Slate', value: '#64748B' },
  { label: 'Teal', value: '#14B8A6' },
  { label: 'Violet', value: '#8B5CF6' },
  { label: 'Cyan', value: '#06B6D4' },
  { label: 'Sky', value: '#0EA5E9' },
  { label: 'Orange', value: '#F97316' },
  { label: 'Red', value: '#EF4444' },
  { label: 'Green', value: '#22C55E' },
  { label: 'Pink', value: '#EC4899' },
  { label: 'Lime', value: '#84CC16' },
  { label: 'Fuchsia', value: '#D946EF' },
  { label: 'Purple', value: '#A855F7' },
  { label: 'Yellow', value: '#EAB308' },
  { label: 'Stone', value: '#78716C' },
  { label: 'Zinc', value: '#52525B' },
  { label: 'Neutral', value: '#737373' },
  { label: 'Warm Gray', value: '#78716C' },
  { label: 'Cool Gray', value: '#6B7280' },
  { label: 'True Gray', value: '#737373' },
  { label: 'Deep Blue', value: '#1E3A8A' },
  { label: 'Midnight', value: '#1E293B' },
  { label: 'Charcoal', value: '#36454F' },
  { label: 'Steel', value: '#43464B' },
  { label: 'Coffee', value: '#6F4E37' },
  { label: 'Royal Blue', value: '#4169E1' },
];

const Form = () => {
  const [loadingATS, setLoadingATS] = useState(false);
  const { resumeinfo, setResumeinfo } = useContext(ResumeContext);
  const [fstage, setFstage] = useState(1);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [atsdetails,setAtsDetails]=useState();

  if (!resumeinfo) return <div className="p-4 text-gray-600">Loading...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeinfo((prev) => ({
      ...prev,
      basics: {
        ...prev.basics,
        [name]: value,
      },
    }));
  };

  const handleColorChange = (e) => {
    const value = e.target.value;
    setResumeinfo((prev) => ({
      ...prev,
      basics: {
        ...prev.basics,
        color: value,
      },
    }));
  };

  const generateAISummary = async () => {
    setLoadingSummary(true);
    const { name, position, experience } = resumeinfo.basics;

    try {
    const text = await aimodel(
  `Generate a professional, keyword-rich resume summary in 5–7 sentences for a candidate named ${name}. The candidate is applying for a ${position} role and has ${experience} years of relevant experience. 
The summary should highlight their skills, achievements, industry knowledge, and career focus—without using generic filler phrases or suggesting edits. Avoid any statements like "you can include" or "you might want to add." The output should read as if it's ready to be placed directly on a resume.`
);


      setResumeinfo((prev) => ({
        ...prev,
        basics: {
          ...prev.basics,
          summary: text,
        },
      }));
    } catch (error) {
      console.error('Error generating summary:', error);
    }

    setLoadingSummary(false);
  };

    const handleCheckAtsScore = async () => {

    try {
     const result = await aimodel(
  `Analyze this resume data for ATS (Applicant Tracking System) compatibility.  
  Give a detailed analysis and provide a score out of 100:
  ${JSON.stringify(resumeinfo, null, 2)} plz do not mention any symbols like * , # or others `
);

const atsHTML = `
  <li><b>ATS Score:</b> <i>${result.match(/score[^0-9]*(\d{1,3})/i)?.[1] || 'N/A'}/100</i></li>
  <li><b>Key Findings:</b></li>
  <li><i>${result.split('\n').slice(1, 4).join('</i></li><li><i>')}</i></li>
  <li><b>Suggestions:</b></li>
  <li><i>${result.split('\n').slice(4, 8).join('</i></li><li><i>')}</i></li>
`;
     setAtsDetails(atsHTML);
     document.getElementById('ad').innerHTML=atsHTML;
    } catch (error) {
      console.error('ATS Score generation failed:', error);
    }
    
  };
  const handleSave = () => setFstage((prev) => prev + 1);
  const handleBack = () => setFstage((prev) => Math.max(1, prev - 1));

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {fstage === 1 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Basic Information</h2>
            <div className="flex items-center space-x-4">
              <select
                name="color"
                value={resumeinfo.basics.color}
                onChange={handleColorChange}
                className="border px-3 py-2 rounded-lg text-sm text-gray-700 shadow-sm bg-gray-50"
              >
                {professionalColors.map((color) => (
                  <option key={color.value} value={color.value}>{color.label}</option>
                ))}
              </select>
              <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: resumeinfo.basics.color }} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {["name", "position", "email", "phone", "address", "linkedin", "github", "experience"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  name={field}
                  value={resumeinfo.basics[field] || ''}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                  className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
            >
              Save and Continue
            </button>
          </div>
        </motion.section>
      )}

      {fstage === 2 && (
        <motion.section
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100"
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Professional Summary</h2>
          <p className="text-gray-600 mb-6">Write a brief summary or generate one using AI.</p>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Summary</label>

            {!resumeinfo.basics.useAutoSummary ? (
              <>
                <textarea
                  rows={5}
                  name="summary"
                  value={resumeinfo.basics.summary || ''}
                  onChange={(e) =>
                    setResumeinfo((prev) => ({
                      ...prev,
                      basics: {
                        ...prev.basics,
                        summary: e.target.value,
                      },
                    }))
                  }
                  placeholder="Write your summary here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() =>
                    setResumeinfo((prev) => ({
                      ...prev,
                      basics: {
                        ...prev.basics,
                        useAutoSummary: true,
                      },
                    }))
                  }
                  className="px-6 py-3 mt-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
                >
                  Or generate summary with AI
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={generateAISummary}
                  disabled={loadingSummary}
                  className="px-4 py-2 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingSummary ? 'Generating...' : 'Generate AI Summary'}
                </button>
                {resumeinfo.basics.summary && (
                  <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-700">
                    {resumeinfo.basics.summary}
                  </div>
                )}
                <button
                  onClick={() =>
                    setResumeinfo((prev) => ({
                      ...prev,
                      basics: {
                        ...prev.basics,
                        useAutoSummary: false,
                      },
                    }))
                  }
                  className="mt-3 text-sm text-gray-600 underline hover:text-gray-800 transition"
                >
                  Write manually instead
                </button>
              </>
            )}
          </div>

          

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl shadow hover:bg-gray-300 transition"
            >
              ← Back
            </button>
            <button
              onClick={() => setFstage((prev) => prev + 1)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
            >
              Continue
            </button>
          </div>
        </motion.section>
      )}

      {fstage === 3 && (
        <motion.section
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 text-center"
        >
          <ExperienceForm />

           <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl shadow hover:bg-gray-300 transition"
            >
              ← Back
            </button>
            <button
              onClick={() => setFstage((prev) => prev + 1)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
            >
              Continue
            </button>
          </div>
        </motion.section>
      )}

      {fstage === 4 && (
        <motion.section
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 text-center"
        >
          <EducationForm />

           <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl shadow hover:bg-gray-300 transition"
            >
              ← Back
            </button>
            <button
              onClick={() => setFstage((prev) => prev + 1)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
            >
              Continue
            </button>
          </div>
        </motion.section>
      )}

       {fstage === 5 && (
        <motion.section
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 text-center"
        >
          <SkillsForm />

           <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl shadow hover:bg-gray-300 transition"
            >
              ← Back
            </button>
            <button
              onClick={() => setFstage((prev) => prev + 1)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
            >
              Continue
            </button>
          </div>
        </motion.section>
      )}


       {fstage === 6 && (
        <motion.section
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 text-center"
        >
          <CertificationsForm />

           <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl shadow hover:bg-gray-300 transition"
            >
              ← Back
            </button>
            <button
              onClick={() => setFstage((prev) => prev + 1)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
            >
              Continue
            </button>
          </div>
        </motion.section>
      )}

       {fstage === 7 && (
        <motion.section
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 text-center"
        >
          <LanguagesForm />

           <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl shadow hover:bg-gray-300 transition"
            >
              ← Back
            </button>
            <button
              onClick={() => setFstage((prev) => prev + 1)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
            >
              Continue
            </button>
          </div>
        </motion.section>
      )}

       {fstage === 8 && (
        <motion.section
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 text-center"
        >
          <InterestsForm/>

           <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl shadow hover:bg-gray-300 transition"
            >
              ← Back
            </button>
            <button
              onClick={() => setFstage((prev) => prev + 1)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
            >
              Continue
            </button>
          </div>
        </motion.section>
      )}

        {fstage === 9 && (
        <motion.section
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 text-center"
        >
          <button
            className="px-6 py-3 font-semibold rounded-xl shadow-md transition duration-300"
            style={{ backgroundColor: resumeinfo.basics.color|| 'green', color: 'white' }}
            onClick={handleCheckAtsScore}
          >
            Check ATS Score
          </button>

          {loadingATS && renderLoadingOverlay('Analyzing resume for ATS compatibility...')}

          {atsdetails && (
            <ul
              id="ad"
              className="mt-6 text-left bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 space-y-2"
              dangerouslySetInnerHTML={{ __html: atsdetails }}
            />
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl shadow hover:bg-gray-300 transition"
            >
              ← Back
            </button>
            <button
              onClick={() => setFstage((prev) => prev + 1)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
            >
              Continue
            </button>
          </div>
        </motion.section>
      )}

  
    
    </div>
  );
};

export default Form;
