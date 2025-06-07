import React from 'react';
import { Link } from 'react-router-dom';
import { Wand2, Cpu, GaugeCircle, LayoutDashboard, Rocket, Stars, Palette, Type } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen text-gray-800 font-inter">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow bg-white sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-600">ResumeGen AI</h1>
        <Link to="/builder">
          <button className="bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700 transition">
            Build Resume
          </button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="text-center py-24 px-6 bg-gradient-to-tr from-blue-600 to-indigo-700 text-white relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold mb-4"
        >
          Build Smart Resumes. Beat the ATS.
        </motion.h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Create stunning, job-winning resumes optimized by AI and scored by ATS simulators.
        </p>
        <Link to="/builder">
          <button className="bg-white cursor-pointer text-blue-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition">
            Try It Now — Free
          </button>
        </Link>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-3">Everything You Need to Land the Interview</h3>
          <p className="text-gray-600 max-w-xl mx-auto">
            We combine beautiful design, artificial intelligence, and data-driven feedback to give your resume a real edge.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
          {[ 
            {
              icon: Palette,
              title: "Multiple Color Themes",
              desc: "Switch between vibrant color palettes and light/dark modes instantly.",
            },
            {
              icon: Type,
              title: "Rich Text Editor",
              desc: "Customize each section of your resume with formatting, bullets, and highlights.",
            },
            {
              icon: GaugeCircle,
              title: "ATS Score Checker",
              desc: "Get instant ATS compatibility scores to see how recruiters' systems will read your resume.",
            },
            {
              icon: Cpu,
              title: "AI Feedback",
              desc: "AI suggests keyword improvements, fixes structure, and boosts clarity in seconds.",
            },
            {
              icon: Wand2,
              title: "1-Click Optimization",
              desc: "Apply suggested changes automatically and boost your score in one click.",
            },
            {
              icon: Rocket,
              title: "Fast & Responsive",
              desc: "Lightning-fast performance on any device. Build a resume in under 5 minutes.",
            },
          ].map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <f.icon size={32} className="text-blue-600 mb-4" />
              <h4 className="text-lg font-semibold mb-2">{f.title}</h4>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Live ATS Score Mockup */}
      <section className="py-20 bg-gray-100 px-6">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h3 className="text-3xl font-bold text-gray-800 mb-2">See How Recruiters Will Score You</h3>
          <p className="text-gray-600">Simulate the ATS results and fix issues before you apply.</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 relative">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-semibold">Your ATS Score</h4>
            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-medium">
              82% — Great!
            </span>
          </div>
          <ul className="space-y-4 text-left text-sm">
            <li>✅ <strong>Keywords Match:</strong> JavaScript, React, Tailwind</li>
            <li>⚠️ <strong>Issue:</strong> Missing action verbs in work experience</li>
            <li>💡 <strong>AI Suggestion:</strong> Add measurable results like “Improved performance by 40%”</li>
          </ul>
          <div className="mt-6 text-right">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              Auto-Apply Fixes
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white text-center px-6">
        <h3 className="text-3xl font-bold mb-10 text-gray-800">Loved by Job Seekers Worldwide</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[ 
            {
              quote: "ResumeGen AI helped me land 3 interviews in one week! The AI feedback was spot on.",
              name: "Priya D.",
              role: "Software Engineer",
            },
            {
              quote: "The ATS score feature saved me from sending a weak resume. Amazing tool!",
              name: "James R.",
              role: "Marketing Specialist",
            },
            {
              quote: "A game-changer! I loved how easy it was to apply AI suggestions.",
              name: "Sara M.",
              role: "Data Analyst",
            },
          ].map((t, idx) => (
            <div key={idx} className="bg-gray-100 p-6 rounded-xl shadow">
              <Stars className="text-yellow-500 mb-2 mx-auto" size={20} />
              <p className="italic text-gray-700">"{t.quote}"</p>
              <p className="mt-4 font-semibold">— {t.name}, {t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-blue-600 text-center text-white">
        <h4 className="text-2xl font-bold mb-2">AI-Powered Resume Building Awaits</h4>
        <p className="mb-6">Don’t just build a resume. Build your career future.</p>
        <Link to="/builder">
          <button className="bg-white cursor-pointer text-blue-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition">
            Start for Free
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-sm py-6 text-center">
        <p>© {new Date().getFullYear()} ResumeGen AI. Made with ❤️ to help you get hired. <a href="http://linkedin.com/in/ved-mahajan8290"> <b>-Ved Mahajan</b></a></p>
      </footer>
    </div>
  );
};

export default LandingPage;
