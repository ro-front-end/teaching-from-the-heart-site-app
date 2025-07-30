"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaBook, FaBookOpen, FaHome, FaList, FaWhatsapp } from "react-icons/fa";

const links = [
  { id: 1, name: "inicio", href: "/#inicio", icon: <FaHome /> },
  { id: 2, name: "acerca", href: "/#acerca", icon: <FaList /> },
  { id: 3, name: "servicios", href: "/#servicios", icon: <FaBookOpen /> },
  { id: 4, name: "cuentos", href: "/#cuentos", icon: <FaBook /> },
  { id: 5, name: "contacto", href: "/#contacto", icon: <FaWhatsapp /> },
];

function BurgerMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const handleCloseMenuOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseMenuOutside);

    return () => {
      document.removeEventListener("mousedown", handleCloseMenuOutside);
    };
  }, []);

  const handleCloseMenuLink = () => {
    setShowMenu(false);
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex flex-col"
        type="button"
      >
        <span
          className={`w-5 h-[.3rem] bg-emerald-300 transition duration-300 ease-in-out mb-1 ${
            showMenu ? "translate-y-[.6rem] rotate-45 bg-red-400" : ""
          }`}
        ></span>
        <span
          className={`w-5 h-[.3rem] bg-emerald-300 transition duration-300 ease-in-out mb-1  ${
            showMenu ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`w-5 h-[.3rem] bg-emerald-300 transition duration-300 ease-in-out ${
            showMenu ? "-translate-y-2 -rotate-45 bg-red-400" : ""
          }`}
        ></span>
      </button>
      {showMenu ? (
        <ul className="flex flex-col bg-rose-300 text-rose-950  p-6 gap-3 absolute top-[2.96rem] right-0 z-20">
          {links.map((link) => (
            <li
              className="flex gap-4 justify-between items-baseline underline hover:text-rose-700"
              onClick={handleCloseMenuLink}
              key={link.id}
            >
              <Link href={link.href}>{link.name}</Link>
              <span>{link.icon} </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default BurgerMenu;
