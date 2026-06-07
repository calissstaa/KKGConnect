"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
      <div className="nav-logo">
        <div className="logo-icon">🎓</div>
        <div className="logo-text">KKG<span>Connect</span></div>
      </div>
      <ul className={`nav-links ${isOpen ? "open" : ""}`} id="navLinks">
        <li>
          <Link href="/" className={pathname === "/" ? "active" : ""} onClick={closeNav}>
            Beranda
          </Link>
        </li>
        <li>
          <Link href="/about" className={pathname === "/about" ? "active" : ""} onClick={closeNav}>
            Tentang
          </Link>
        </li>
        <li>
          <Link href="/hima" className={pathname === "/hima" || pathname.startsWith("/hima/") ? "active" : ""} onClick={closeNav}>
            HIMA
          </Link>
        </li>
        <li>
          <Link href="/ukm" className={pathname === "/ukm" || pathname.startsWith("/ukm/") ? "active" : ""} onClick={closeNav}>
            UKM
          </Link>
        </li>
        <li>
          <Link href="/kontak" className={pathname === "/kontak" ? "active" : ""} onClick={closeNav}>
            Kontak
          </Link>
        </li>
      </ul>
      <div className="hamburger" id="hamburger" onClick={toggleNav}>
        <span></span><span></span><span></span>
      </div>
    </nav>
  );
}
