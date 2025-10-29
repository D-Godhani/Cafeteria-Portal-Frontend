// src/components/home/Footer.tsx

import React from "react";
import Link from "next/link";
import { Coffee } from "lucide-react"; // Example icon

const Footer: React.FC = () => {
  return (
    // Using the theme's "neutral" color for a dark, stylish footer
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <aside>
        <Coffee size={48} />
        <p className="font-bold text-lg">
          DAIICT Cafeteria Management Committee
          <br />
          <span className="font-normal">
            Providing fresh and healthy meals since 2001.
          </span>
        </p>
      </aside>
      <nav>
        <header className="footer-title">Useful Links</header>
        <Link href="/complaints" className="link link-hover">
          File a Complaint
        </Link>
        <Link href="/feedback" className="link link-hover">
          Give Feedback
        </Link>
        <a
          href="https://www.daiict.ac.in"
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover"
        >
          DAIICT Main Website
        </a>
      </nav>
      <nav>
        <header className="footer-title">Contact</header>
        <a
          href="mailto:cafeteria-comm@daiict.ac.in"
          className="link link-hover"
        >
          cafeteria-comm@daiict.ac.in
        </a>
        <p>Gandhinagar, Gujarat</p>
      </nav>
    </footer>
  );
};

export default Footer;
