import React, { useState, useEffect } from 'react';
import ResumeContext from '../../src/Context/ResumeContext';
import dummy from './dummy';
import Form from './form/Form';
import ResumePreview from './resumePreview/ResumePreview';
import './resumePreview/rpreview.css';

const Home = () => {
  const [resumeinfo, setResumeinfo] = useState(null);

  useEffect(() => {
    setResumeinfo(dummy);
  }, []);

  if (!resumeinfo) return <div>Loading...</div>;

  return (
    <ResumeContext.Provider value={{ resumeinfo, setResumeinfo }}>
      <div className="flex w-full min-h-screen">
       <div className="fixed left-0 top-0 w-1/2 p-4 bg-gray-100 h-screen overflow-auto">
  <Form />
</div>
<div className="ml-[50%] w-1/2 p-4 bg-gray-100">
  <ResumePreview />
</div>

      </div>
    </ResumeContext.Provider>
  );
};

export default Home;
