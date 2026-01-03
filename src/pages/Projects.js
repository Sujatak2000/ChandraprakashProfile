import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { ScrollControls, useScroll, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import "./Projects.css";

// GlobalStyles, Road, createRoundedRectWithUV, RoundedScreen components waise hi rahenge...
function GlobalStyles() {
    return (
      <style>{`
        :root{--bg-start:#000000;--bg-end:#050505;--text:#ffffff;--cyan:#00ffff;--magenta:#ff00ff;--green:#00ff66;--yellow:#ffff00;}
        html, body, #root{height:100%;background: linear-gradient(180deg, var(--bg-start), var(--bg-end));color: var(--text);}
        body{ overflow:hidden; }
        a, button{ color:var(--text); }
        .glow-cyan{ box-shadow: 0 0 18px rgba(0,255,255,.6), inset 0 0 18px rgba(0,255,255,.25); }
        .glow-magenta{ box-shadow: 0 0 18px rgba(255,0,255,.55), inset 0 0 18px rgba(255,0,255,.25); }
        .glow-green{ box-shadow: 0 0 18px rgba(0,255,102,.55), inset 0 0 18px rgba(0,255,102,.25); }
        .glow-yellow{ box-shadow: 0 0 18px rgba(255,255,0,.55), inset 0 0 18px rgba(255,255,0,.25); }
      `}</style>
    );
}
function Road({ lanes = [-4, -2, 0, 2, 4], length = 100, spacing = 2 }) {
    const scroll = useScroll();
    const dotsRef = useRef([]);
    const { viewport } = useThree();
    useFrame(() => {
      const offset = scroll.scroll.current * 50;
      const visibleRange = 80;
      dotsRef.current.forEach((dot, idx) => {
        if (!dot) return;
        const laneCount = lanes.length;
        const i = Math.floor(idx / laneCount);
        let z = -i * spacing + offset;
        if (z > visibleRange || z < -5) { dot.visible = false; return; } else { dot.visible = true; }
        const bendPower = viewport.width / 2.5;
        const curveX = Math.sin(z * 0.05) * bendPower;
        const baseX = dot.userData.baseX * 0.6;
        const x = baseX + curveX;
        dot.position.set(x, -2, z);
      });
    });
    const dots = [];
    for (let i = 0; i < length; i++) {
      lanes.forEach((laneX, laneIndex) => {
        const y = -2;
        const z = -i * spacing;
        dots.push(
          <mesh key={`${laneIndex}-${i}`} ref={(el) => (dotsRef.current[i * lanes.length + laneIndex] = el)} userData={{ baseX: laneX }} position={[laneX, y, z]} rotation={[-Math.PI / 2, 0, 0]} >
            <circleGeometry args={[0.08, 16]} /> <meshBasicMaterial color="#ffffff" />
          </mesh>
        );
      });
    }
    return <group>{dots}</group>;
}
function createRoundedRectWithUV(w, h, r, segments = 8) {
    const shape = new THREE.Shape();
    const hw = w / 2; const hh = h / 2;
    shape.moveTo(-hw + r, -hh); shape.lineTo(hw - r, -hh); shape.quadraticCurveTo(hw, -hh, hw, -hh + r); shape.lineTo(hw, hh - r); shape.quadraticCurveTo(hw, hh, hw - r, hh); shape.lineTo(-hw + r, hh); shape.quadraticCurveTo(-hw, hh, -hw, hh - r); shape.lineTo(-hw, -hh + r); shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
    const geometry = new THREE.ShapeGeometry(shape, segments);
    geometry.computeBoundingBox();
    const max = geometry.boundingBox.max; const min = geometry.boundingBox.min;
    const range = new THREE.Vector2(max.x - min.x, max.y - min.y);
    const uvAttr = [];
    for (let i = 0; i < geometry.attributes.position.count; i++) {
      const x = geometry.attributes.position.getX(i); const y = geometry.attributes.position.getY(i);
      uvAttr.push((x - min.x) / range.x, (y - min.y) / range.y);
    }
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvAttr, 2));
    return geometry;
}
function RoundedScreen({ texture, onClick }) {
    const geometry = useMemo(() => createRoundedRectWithUV(4, 2.5, 0.25), []);
    texture.minFilter = THREE.LinearFilter; texture.magFilter = THREE.LinearFilter;
    return (<mesh geometry={geometry} onClick={onClick}><meshBasicMaterial map={texture} transparent opacity={0} /></mesh>);
}

// ---------------- Projects (with responsive adjustment) ----------------
// ✅ CHANGE 1: Renamed this function from 'Projects' to 'Projects3D'
function Projects3D({ images, onProjectClick }) {
  const scroll = useScroll();
  const groupRef = useRef();
  const textures = useLoader(THREE.TextureLoader, images);
  const { viewport } = useThree();
  const isMobile = viewport.width < 4;

  useFrame(() => {
    if (!groupRef.current) return;
    const offset = scroll.scroll.current * 100;
    groupRef.current.children.forEach((tv, i) => {
      const baseZ = -i * 20 - 10;
      const targetZ = baseZ + offset;
      tv.position.z = targetZ;
      tv.position.y = 1.2;
      tv.position.x = isMobile ? 0 : (i % 2 === 0 ? -2.5 : 2.5);
      const progress = Math.min(Math.max((offset - i * 5 + 8) / 20, 0), 1);
      tv.scale.set(progress, progress, progress);
      tv.rotation.y = isMobile ? 0 : (i % 2 === 0 ? 0.25 : -0.25) * progress;
      const screen = tv.children[0];
      if (screen && screen.material) {
        screen.material.opacity = progress;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {textures.map((texture, i) => (
        <group key={i}>
          <RoundedScreen texture={texture} onClick={() => onProjectClick(i)} />
        </group>
      ))}
    </group>
  );
}

// ---------------- Overlay (details) - Updated with ClassNames ----------------
// ---------------- Overlay (details) - REORDERED & Updated with ClassNames ----------------
function ProjectOverlay({ project, onClose, onNext, onPrev }) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    setImgIndex(0); // Reset image index when project changes
  }, [project]);

  if (!project) return null;

  const totalImages = project.images.length;
  const handleNextImage = () => setImgIndex((prev) => (prev + 1) % totalImages);
  const handlePrevImage = () => setImgIndex((prev) => (prev - 1 + totalImages) % totalImages);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="overlay-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button onClick={onClose} aria-label="Close" className="overlay-close-btn">
            ✕
          </button>
          
          <div className="overlay-content">
            
            {/* ✅ CHANGE 1: Image wrapper ab pehle aa gaya hai */}
            <motion.div
              className="overlay-image-wrapper"
              initial={{ x: -50, opacity: 0 }} // Animation swapped (pehle +50 tha)
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {project.images && project.images.length > 0 ? (
                <>
                  <img src={project.images[imgIndex]} alt={project.title} className="overlay-image" />
                  {project.images.length > 1 && (
                    <>
                      <button onClick={handlePrevImage} className="image-nav-btn prev glow-magenta">
                        ←
                      </button>
                      <button onClick={handleNextImage} className="image-nav-btn next glow-magenta">
                        →
                      </button>
                    </>
                  )}
                </>
              ) : (
                <p>No images available</p>
              )}
            </motion.div>

            {/* ✅ CHANGE 2: Text wrapper ab baad mein aa gaya hai */}
            <motion.div
              className="overlay-text"
              initial={{ x: 50, opacity: 0 }} // Animation swapped (pehle -50 tha)
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1>{project.title}</h1>
              <p className="description">{project.description}</p>
              <div className="overlay-details">
                <p><strong>Client:</strong> LVMH Group</p>
                <p><strong>Year:</strong> 2024</p>
                <p><strong>Technologies:</strong> Three.js, React, Blender</p>
                <p><strong>Awards:</strong> CSS Design Award Nominee</p>
              </div>
              <a href="#" className="visit-project-btn glow-green">
                Visit Project →
              </a>
              <div className="nav-buttons">
                <button onClick={onPrev} className="prev-btn glow-yellow">
                  ← Prev Project
                </button>
                <button onClick={onNext} className="next-btn glow-cyan">
                  Next Project →
                </button>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
// ---------------- Main Projects Page Component ----------------
export default function Projects() {
  const [selected, setSelected] = useState(null);

  const projectData = [
    { title: "LVMH The Showroom", images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=90", "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=90", "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1920&q=90"], description: "Immersive 3D experience for LVMH using Three.js and Nuxt." },
    { title: "Cosmic Shelter", images: [ "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=90", "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1920&q=90"], description: "3D interactive web experience built for Cosmic Shelter."},
    { title: "Digital Experience", images: ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1920&q=90", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=90", "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=90"], description: "Modern 3D digital environment for showcasing brands."}
  ];

  const handleNext = () => setSelected((prev) => (prev + 1) % projectData.length);
  const handlePrev = () => setSelected((prev) => (prev - 1 + projectData.length) % projectData.length);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'visible'; };
  }, []);

  return (
    <>
      <GlobalStyles />
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 2, 6], fov: 60 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 10, 5]} intensity={1} />
          <ScrollControls pages={10} damping={0.2}>
            <Road />
            {/* ✅ CHANGE 2: Using the renamed component 'Projects3D' here */}
            <Projects3D
              images={projectData.map((p) => p.images[0])}
              onProjectClick={(i) => setSelected(i)}
            />
          </ScrollControls>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <ProjectOverlay
        project={selected != null ? projectData[selected] : null}
        onClose={() => setSelected(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}