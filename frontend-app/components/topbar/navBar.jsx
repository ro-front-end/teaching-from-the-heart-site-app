import { Link } from "react-router-dom";
import BurgerMenu from "./burgerMenu";
import useAuthHook from "../../utils/authHook";
import { FaUser } from "react-icons/fa";

function NavBar() {
  const { isLoggedIn } = useAuthHook();

  return (
    <nav className="p-4 flex justify-between items-end border-b-2 border-emerald-200/40">
      <Link to="/">
        <img
          className="opacity-65"
          width={40}
          height={40}
          src="/logo-teach.png"
          alt="logo de teaching from the heart"
        />
      </Link>
      <div className="flex items-baseline-last gap-4">
        {!isLoggedIn ? (
          <Link
            className="bg-rose-400 py-1 px-4 rounded-lg text-rose-50 font-semibold hover:bg-rose-500 transition duration-300 ease-in-out"
            to="/login"
          >
            login
          </Link>
        ) : (
          <FaUser />
        )}

        <BurgerMenu />
      </div>
    </nav>
  );
}

export default NavBar;
