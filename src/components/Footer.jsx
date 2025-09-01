import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center p-6 bg-base-200 text-base-content">
      <aside className="max-w-7xl mx-auto">
        <p className="font-semibold text-[10px]">
          © {new Date().getFullYear()} Graha Pravesh — All rights reserved
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
