import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  FolderKanban,
  Video,
  User,
  Mail,
} from "lucide-react"; // icons
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home", icon: <Home size={18} /> },
    { to: "/projects", label: "Projects", icon: <FolderKanban size={18} /> },
    { to: "/videos", label: "Videos", icon: <Video size={18} /> },
    { to: "/about", label: "About", icon: <User size={18} /> },
    { to: "/contact", label: "Contact", icon: <Mail size={18} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="profile">
        <img src="/profile.jpg" alt="Profile" className="profile-img" />
        <h3>Sujata</h3>
        <p className="subtitle">Professional Developer</p>
      </div>

      <nav>
        <ul>
          {navLinks.map((link) => (
            <li
              key={link.to}
              className={location.pathname === link.to ? "active" : ""}
            >
              <Link to={link.to}>
                <span className="icon">{link.icon}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
