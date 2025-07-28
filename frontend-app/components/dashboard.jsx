import { useState } from "react";
import CreateStoryform from "../components/createStoryform";
import StoriesList from "../components/storiesList";
import DashboardContent from "./dashboardContent";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [content, setContent] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex min-h-[88vh] w-full overflow-hidden">
      <div className="flex flex-col items-center justify-between p-2 bg-rose-100">
        <DashboardContent onChangeView={setContent} />
        <button
          onClick={handleLogout}
          className="flex flex-col items-center text-neutral-950/60 cursor-pointer hover:text-rose-950 transition duration-300 ease-in-out"
          type="button"
        >
          <FaSignOutAlt className="" />
          <span>logout</span>
        </button>
      </div>

      <div className="p-4 w-full mx-auto">
        {content === 0 && <StoriesList />}
        {content === 1 && <CreateStoryform onChangeView={setContent} />}
      </div>
    </div>
  );
}

export default Dashboard;
