import React from "react";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import logo from "./logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto flex flex-col items-center md:flex-row justify-between px-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-24" />
        </div>
        <div className="text-center md:text-left mt-4 md:mt-0">
          <p className="text-sm">
            &copy; 2024 Rishabh Jain. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://www.linkedin.com/in/rishabhjain20/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://www.instagram.com/rishabhjain0520/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://github.com/rishabhjain208"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
