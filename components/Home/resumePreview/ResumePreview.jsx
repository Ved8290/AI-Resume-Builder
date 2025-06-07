import React, { useContext, useRef, useEffect } from 'react';
import ResumeContext from '../../../src/Context/ResumeContext';
import { usePDF } from 'react-to-pdf';

const ResumePreview = () => {
 
 const { resumeinfo } = useContext(ResumeContext);
  const componentPDF = useRef();
  const { toPDF, targetRef } = usePDF({ filename: 'resume.pdf' });

  const sanitizeColorsInDom = (el) => {
    const cl=resumeinfo.basics.color;
    const elements = el.querySelectorAll('*');
    elements.forEach(e => {
      const style = window.getComputedStyle(e);
      ['color', 'backgroundColor', 'borderColor', 'outlineColor'].forEach(prop => {
        const value = style.getPropertyValue(prop);
        if (value.includes('oklch')) {
          e.style[prop] = cl; // fallback color
        }
      });
    });
  };

  const handlePrint = () => {
    if (targetRef.current) {
      sanitizeColorsInDom(targetRef.current);
      toPDF();
    }
  };

  useEffect(() => {
    console.log('componentPDF ref:', componentPDF.current);
  }, [resumeinfo]);

  if (!resumeinfo) return <div className="p-4 text-gray-600">Loading Preview...</div>;

  const accentColor =  '#000000';
  const maincor =resumeinfo.basics.color ;
  const hasValue = (value) => value !== undefined && value !== null && value.toString().trim() !== '';

  return (
    <>
      {/* Download Button */}
      <div className="flex justify-end p-4 bg-gray-50">
        <button
          onClick={handlePrint}
          className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download PDF
        </button>
      </div>

      {/* Resume Content */}
      <div ref={targetRef} style={{ width: '100%', minHeight: '100vh' }}>
        <div
          className="bg-white text-gray-800 p-10 max-w-4xl mx-auto shadow-lg rounded-xl border-t-8"
          style={{ borderColor: accentColor }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            {hasValue(resumeinfo.basics.name) && (
              <h1 className="text-4xl font-bold" style={{ color:maincor }}>
                {resumeinfo.basics.name}
              </h1>
            )}
            {hasValue(resumeinfo.basics.position) && (
              <h2 className="text-xl font-medium mt-1">{resumeinfo.basics.position}</h2>
            )}
          </div>

          {/* Contact Info */}
          {(hasValue(resumeinfo.basics.email) ||
            hasValue(resumeinfo.basics.phone) ||
            hasValue(resumeinfo.basics.address) ||
            hasValue(resumeinfo.basics.linkedin) ||
            hasValue(resumeinfo.basics.github) ||
            hasValue(resumeinfo.basics.experience)) && (
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <div>
                {hasValue(resumeinfo.basics.email) && (
                  <p><strong>Email:</strong> {resumeinfo.basics.email}</p>
                )}
                {hasValue(resumeinfo.basics.phone) && (
                  <p><strong>Phone:</strong> {resumeinfo.basics.phone}</p>
                )}
                {hasValue(resumeinfo.basics.address) && (
                  <p><strong>Address:</strong> {resumeinfo.basics.address}</p>
                )}
              </div>
              <div>
                {hasValue(resumeinfo.basics.linkedin) && (
                  <p><strong>LinkedIn:</strong> {resumeinfo.basics.linkedin}</p>
                )}
                {hasValue(resumeinfo.basics.github) && (
                  <p><strong>GitHub:</strong> {resumeinfo.basics.github}</p>
                )}
                {hasValue(resumeinfo.basics.experience) && (
                  <p><strong>Experience:</strong> {resumeinfo.basics.experience} Years</p>
                )}
              </div>
            </div>
          )}

          <hr className="my-6 border-t-2" style={{ borderColor: maincor }} />

          {/* About Me */}
          {hasValue(resumeinfo.basics.summary) && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2" style={{ color: maincor }}>About Me</h3>
              <p className="leading-relaxed text-sm text-gray-700">{resumeinfo.basics.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {resumeinfo.experience?.length > 0 &&
            resumeinfo.experience.some(job => hasValue(job.role) || hasValue(job.company)) && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4" style={{ color: maincor }}>Work Experience</h3>
                {resumeinfo.experience.map((job, idx) =>
                  (hasValue(job.role) || hasValue(job.company)) && (
                    <div key={idx} className="mb-6">
                      <div className="flex justify-between flex-wrap md:flex-nowrap md:items-center">
                        <h4  className="text-lg font-bold">
                          {job.role} {job.company && ` - ${job.company}`}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {job.startDate} {job.currentlyWorking ? '— Present' : `— ${job.endDate}`}
                        </p>
                      </div>
                      {hasValue(job.description) && (
                        <div
                          className="text-sm text-gray-700 mt-2"
                          dangerouslySetInnerHTML={{ __html: job.description }}
                        />
                      )}
                      {hasValue(job.summary) && (
                        <div
                          className="text-sm text-gray-600 mt-2 italic"
                          dangerouslySetInnerHTML={{ __html: job.summary }}
                        />
                      )}
                    </div>
                  )
                )}
              </div>
            )}

          {/* Education */}
          {resumeinfo.education?.length > 0 &&
            resumeinfo.education.some(edu => hasValue(edu.institution)) && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4" style={{ color: maincor }}>Education</h3>
                {resumeinfo.education.map((edu, idx) => (
                  hasValue(edu.institution) && (
                    <div key={idx} className="mb-4">
                      <h4 className="text-lg font-semibold">{edu.institution}</h4>
                      <p className="text-sm text-gray-700">{edu.degree} in {edu.area}</p>
                      <p className="text-sm text-gray-500">{edu.startDate} — {edu.endDate}</p>
                      {hasValue(edu.gpa) && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                    </div>
                  )
                ))}
              </div>
            )}

          {/* Skills */}
          {resumeinfo.skills?.length > 0 &&
            resumeinfo.skills.some(skill => hasValue(skill.name)) && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4" style={{ color:maincor }}>Skills</h3>
                {resumeinfo.skills.map((skillCategory, idx) => (
                  hasValue(skillCategory.name) && (
                    <div key={idx} className="mb-3">
                      <h4 className="font-semibold">{skillCategory.name}</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {skillCategory.keywords
                          .filter(keyword => hasValue(keyword))
                          .map((keyword, kidx) => <li key={kidx}>{keyword}</li>)}
                      </ul>
                    </div>
                  )
                ))}
              </div>
            )}

          {/* Certifications */}
          {resumeinfo.certifications?.length > 0 &&
            resumeinfo.certifications.some(cert => hasValue(cert.title)) && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4" style={{ color: maincor }}>Certifications</h3>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {resumeinfo.certifications.map((cert, idx) => (
                    hasValue(cert.title) && (
                      <li key={idx} className="mb-1">
                        <strong>{cert.title}</strong> — {cert.issuer || 'N/A'}{' '}
                        <span className="text-gray-500">{cert.date && <span>{cert.date}</span>}</span>
                      </li>
                    )
                  ))}
                </ul>
              </div>
            )}

          {/* Languages */}
          {resumeinfo.languages?.length > 0 &&
            resumeinfo.languages.some(lang => hasValue(lang.language)) && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4" style={{ color: maincor }}>Languages</h3>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {resumeinfo.languages.map((lang, idx) => (
                    hasValue(lang.language) && (
                      <li key={idx}>
                        {lang.language} — <em>{lang.fluency || 'N/A'}</em>
                      </li>
                    )
                  ))}
                </ul>
              </div>
            )}

          {/* Interests */}
          {resumeinfo.interests?.length > 0 &&
            resumeinfo.interests.some(interest => hasValue(interest)) && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4" style={{ color: maincor }}>Interests</h3>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {resumeinfo.interests
                    .filter(interest => hasValue(interest))
                    .map((interest, idx) => <li key={idx}>{interest}</li>)}
                </ul>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default ResumePreview;
