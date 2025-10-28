// src/components/home/Footer.tsx

import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          Dhirubhai Ambani University
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
