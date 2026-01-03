// App.js
import React from "react";
// ❌ useState ko hata dein
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./App.css";
// ❌ Menu icon aur useState ki zaroorat nahi hai

function App() {
  // ❌ State aur toggle function ko hata dein

  return (
    <Router>
      {/* 👇 Yahan se 'sidebar-open' wali class logic hata dein */}
      <div className="app">
        <Sidebar />
        <main className="main-content">
          {/* ❌ Hamburger Menu Button ko poora hata dein */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} /> 
            <Route path="/contact" element={<Contact />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;