import Image from "next/image";
import Link from "next/link";
import BurgerMenu from "./burgerMenu";
import { FaUser } from "react-icons/fa";

function NavBar() {
  return (
    <nav className="flex items-center justify-between">
      <Link href="/#hero">
        <Image
          className="opacity-70"
          src="/logo-teach.png"
          alt="Logo of a tree"
          width={40}
          height={40}
        />
      </Link>
      <BurgerMenu />
    </nav>
  );
}

export default NavBar;
