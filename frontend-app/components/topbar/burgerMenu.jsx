"use client";

import { useEffect, useRef, useState } from "react";
import { FaAddressBook, FaEnvelopeOpen } from "react-icons/fa";

function BurgerMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  function handleOpenMenu() {
    setShowMenu(!showMenu);
  }

  function handleCloseMenu(e) {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  }

  function handleCloseMenuLink() {
    setShowMenu(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseMenu);

    return () => {
      document.removeEventListener("mousedown", handleCloseMenu);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => handleOpenMenu()}
        className="flex flex-col items-center"
      >
        <span
          className={`w-6 h-[.2rem] bg-emerald-300 mb-1 transition duration-300 ease-in-out ${
            showMenu ? "bg-orange-700 rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`w-6 h-[.2rem] bg-emerald-300 mb-1 transition duration-300 ease-in-out ${
            showMenu ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`w-6 h-[.2rem] bg-emerald-300 mb-1 transition duration-300 ease-in-out ${
            showMenu ? "bg-orange-700 -rotate-45 -translate-y-[.4rem]" : ""
          }`}
        ></span>
      </button>

      {showMenu ? (
        <ul className="z-20 bg-rose-300 text-rose-950 p-8 absolute top-[2.8rem] right-0 flex flex-col gap-4">
          <li className="flex items-center w-full gap-6 hover:text-emerald-600 transition duration-300 ease-in-out">
            <FaAddressBook />
            <a onClick={() => handleCloseMenuLink()} href="/dashboard">
              Dashboard
            </a>
          </li>

          <li className="flex items-center w-full gap-6  hover:text-emerald-600 transition duration-300 ease-in-out">
            <FaEnvelopeOpen />

            <a onClick={() => handleCloseMenuLink()} href="/contact">
              Contact
            </a>
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export default BurgerMenu;
