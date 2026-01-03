import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import "./About.css"; // ✅ CSS FILE IMPORT

// 3D Rotating Object (No change)
function RotatingShape({ color, geometry, position }) {
  const mesh = useRef();
  useFrame(() => {
    if(mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh ref={mesh} position={position} scale={1.35}>
      {geometry}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} metalness={0.55} roughness={0.35} toneMapped={false} />
    </mesh>
  );
}

// 3D Scene (✅ Optimized for mobile)
function Scene({ mouse }) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 6; // Breakpoint for mobile

  useFrame(({ camera }) => {
    camera.position.x += (mouse.current.x * 3 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.current.y * 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  const shapes = [
    { geometry: <boxGeometry args={[0.8, 0.8, 0.8]} />, color: "#00ffff", position: [-7, 4, -3] },
    { geometry: <sphereGeometry args={[0.6, 32, 32]} />, color: "#ff007f", position: [6, -3, 3] },
    { geometry: <dodecahedronGeometry args={[0.65]} />, color: "#00ff66", position: [-5, -4, -2] },
    { geometry: <sphereGeometry args={[0.55, 32, 32]} />, color: "#ffff00", position: [10, 1, -5] },
    { geometry: <boxGeometry args={[0.7, 0.7, 0.7]} />, color: "#00ffff", position: [-3, 6, 4] },
    { geometry: <dodecahedronGeometry args={[0.6]} />, color: "#00ff66", position: [8, 5, -2] },
    { geometry: <octahedronGeometry args={[0.9]} />, color: "#ff00ff", position: [0, 6, -3] },
  ];
  
  // On mobile, show fewer shapes for better performance
  const visibleShapes = isMobile ? shapes.slice(0, 4) : shapes;

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.3} color="#ffffff" />
      <pointLight position={[-10, -5, -5]} intensity={1.1} color="#00ffff" />
      <pointLight position={[0, -3, 5]} intensity={1.0} color="#ff00ff" />
      {visibleShapes.map((shape, i) => (
        <RotatingShape key={i} color={shape.color} geometry={shape.geometry} position={shape.position} />
      ))}
    </>
  );
}

// About Page (✅ Refactored with ClassNames)
export default function About() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
  };

  const info = {
    name: "Chandraprakash Sahu",
    title: "Full Stack Developer",
    summary: "I build scalable, modern applications with a strong focus on clean architecture, delightful UX, and performance.",
    email: "sahu@example.com",
    phone: "+91 6268856261",
    address: "Sabkara, Rajnandgaon",
    avatar: "/profile.jpg",
    socials: { github: "#", linkedin: "#", twitter: "#", instagram: "#" },
  };

  return (
    <div onMouseMove={handleMouseMove} className="about-page-container">
      {/* 3D Animated Background */}
      <Canvas className="about-canvas" camera={{ position: [0, 0, 10], fov: 65 }}>
        <Scene mouse={mouse} />
      </Canvas>

      {/* Content Overlay */}
      <div className="about-content-overlay">
        <div className="about-content-wrapper">
          {/* Hero Card */}
          <div className="about-hero-card">
            {/* Left Column */}
            <div className="about-left-col">
              <img src={info.avatar} alt={`${info.name} profile`} width={200} height={200} className="about-profile-img" />
              <div className="about-contact-box">
                <div className="about-contact-grid">
                  <a href={`mailto:${info.email}`} className="about-contact-item">
                    <FiMail size={18} color="#00ffff" /> <span>{info.email}</span>
                  </a>
                  <a href={`tel:${info.phone.replace(/\s/g, "")}`} className="about-contact-item">
                    <FiPhone size={18} color="#00ffff" /> <span>{info.phone}</span>
                  </a>
                  <div className="about-contact-item" style={{ color: "rgba(255,255,255,0.9)" }}>
                    <FiMapPin size={18} color="#00ffff" /> <span>{info.address}</span>
                  </div>
                </div>
                <div className="about-social-icons">
                  <a href={info.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="about-icon-btn"> <FaGithub size={18} /> </a>
                  <a href={info.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="about-icon-btn"> <FaLinkedin size={18} /> </a>
                  <a href={info.socials.twitter} target="_blank" rel="noreferrer" aria-label="Twitter" className="about-icon-btn"> <FaTwitter size={18} /> </a>
                  <a href={info.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="about-icon-btn"> <FaInstagram size={18} /> </a>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="about-right-col">
              <h1 className="name-heading">{info.name}</h1>
              <div className="title">{info.title}</div>
              <p>{info.summary}</p>
              <div className="badges">
                <div className="badgeBox"> <div className="badgeLabel">Experience</div> <div className="badgeValue">1+ years</div> </div>
                <div className="badgeBox"> <div className="badgeLabel">Specialty</div> <div className="badgeValue">Full Stack</div> </div>
                <div className="badgeBox"> <div className="badgeLabel">Focus</div> <div className="badgeValue">Performance & UX</div> </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <h2 className="section-heading">About Me</h2>
                <p>I’m a Software Developer, Content Creator, and Web Developer—passionate about building fast, resilient applications and sharing coding insights on Instagram and YouTube.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}