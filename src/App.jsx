import { useState } from 'react'
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from '../components/Home';
import LandingPage from '../components/LandingPage';

function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
    <Routes>
      <Route path="/Builder" element={<Home />} />
      <Route path='/' element={<LandingPage />} />
    </Routes>
    </Router>
  )
}

export default App
