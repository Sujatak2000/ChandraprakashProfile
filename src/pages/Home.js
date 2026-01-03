import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">

      {/* ===== Background 3D Character (Spline) ===== */}
      <div className="spline-wrapper">
        <spline-viewer
          url="https://prod.spline.design/lUM7J0TW9L04mXp4/scene.splinecode"
        ></spline-viewer>
      </div>

      {/* ===== Header ===== */}
      <div className="header">
        <h1>I Am Chandraprakash, Full Stack Web Developer </h1>
        <a href="#" className="subscribe">Contact Now →</a>
      </div>

      {/* ===== Stats + Partner Section ===== */}
      <div className="stats-partner">
        <div className="stats-grid">
          <div className="stat"><h2>10+</h2><p>Completed Projects</p></div>
          <div className="stat"><h2>Full Stack Developer</h2></div>
          <div className="stat"><h2>5+</h2><p>Satisfied Clients</p></div>
          <div className="stat"><h2>1 Years</h2><p>Design Experience</p></div>
        </div>

        <div className="partner-section">
          <div className="partner-text">
            <h3>Hi, I am Chandraprakash</h3>
            <p>I’m a Software Developer, Content Creator, and Web Developer—passionate about
                  building fast, resilient applications and sharing coding insights on Instagram and YouTube.</p>
            {/* <a href="#" className="link">Get in touch →</a> */}
          </div>
        </div>
      </div>

      {/* ===== Featured + Trusted Section ===== */}
      <div className="bottom-section">
        <div className="featured">
          <h3>Featured Projects <a href="#">View all →</a></h3>
          <div className="project-preview"></div>
        </div>

      <div className="trusted">
  <h3>My Skills</h3>
  <div className="trusted-logos">
    <div className="logo-card">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML" />
      <p>HTML</p>
    </div>
    <div className="logo-card">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" />
      <p>CSS</p>
    </div>
    <div className="logo-card">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JS" />
      <p>JavaScript</p>
    </div>
    <div className="logo-card">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
      <p>React</p>
    </div>

    <div className="logo-card">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="NodeJS" />
      <p>NodeJS</p>
    </div>
    <div className="logo-card">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
      <p>Python</p>
    </div>
    <div className="logo-card">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
      <p>MongoDB</p>
    </div>
    <div className="logo-card">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" />
      <p>Git</p>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}
