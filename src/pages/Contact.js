import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Stars() {
  const groupRef = useRef();
  const stars = Array.from({ length: 800 }, () => ({
    position: [
      (Math.random() - 0.5) * 400,
      (Math.random() - 0.5) * 400,
      (Math.random() - 0.5) * 400,
    ],
  }));

  useFrame(() => {
    groupRef.current.rotation.y += 0.0005;
  });

  return (
    <group ref={groupRef}>
      {stars.map((star, i) => (
        <mesh key={i} position={star.position}>
          <sphereGeometry args={[0.35, 8, 8]} />
          <meshBasicMaterial color="#9f7aea" />
        </mesh>
      ))}
    </group>
  );
}

function Astronaut() {
  const ref = useRef();
  const speed = 0.02;

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x += speed;
      ref.current.position.z = Math.sin(ref.current.position.x / 3) * 6;
      if (ref.current.position.x > 20) ref.current.position.x = -20;
      ref.current.rotation.z = Math.sin(ref.current.position.x / 2) * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={[-20, -3, 0]}>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial
        map={new THREE.TextureLoader().load("/aa.webp")}
        transparent
      />
    </mesh>
  );
}

export default function Contact() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(180deg, #000000 0%, #0a0a0a 100%)",
        position: "relative",
        overflow: "hidden",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 3D Background */}
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Stars />
        <Astronaut />
      </Canvas>

      {/* Contact Form Box */}
      <div
        style={{
          position: "relative",
          background: "rgba(10, 10, 10, 0.8)",
          border: "1px solid rgba(160, 120, 255, 0.3)",
          backdropFilter: "blur(12px)",
          padding: "45px 40px",
          borderRadius: "25px",
          textAlign: "center",
          maxWidth: "460px",
          boxShadow: "0 0 40px rgba(120, 70, 255, 0.15)",
        }}
      >
        <h1
          style={{
            fontSize: "2.2rem",
            marginBottom: "1.2rem",
            color: "#b794f4",
            textShadow: "0 0 25px rgba(140,100,255,0.5)",
          }}
        >
          Contact Me
        </h1>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message Sent! 💫");
          }}
        >
          <input type="text" placeholder="Your Name" style={inputStyle} required />
          <input type="email" placeholder="Your Email" style={inputStyle} required />
          <textarea
            placeholder="Your Message"
            style={{ ...inputStyle, height: "120px", resize: "none" }}
            required
          />
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg, #8b5cf6, #6366f1)")
            }
            onMouseOut={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg, #6366f1, #8b5cf6)")
            }
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px 15px",
  borderRadius: "12px",
  border: "1px solid rgba(200,180,255,0.25)",
  background: "rgba(255,255,255,0.05)",
  color: "#fff",
  outline: "none",
  fontSize: "0.95rem",
};

const buttonStyle = {
  padding: "14px",
  borderRadius: "15px",
  border: "none",
  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "0.3s",
};
