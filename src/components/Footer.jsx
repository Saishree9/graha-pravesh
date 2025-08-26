import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center p-6 bg-base-200 text-base-content">
      <aside>
        <p className="font-semibold">
          © {new Date().getFullYear()} Graha Pravesh — All rights reserved
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
