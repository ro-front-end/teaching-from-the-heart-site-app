import { useState } from "react";

function DashboardContent({ onChangeView }) {
  const [active, setActive] = useState(0);

  const handleClick = (index) => {
    setActive(index);
    onChangeView(index);
  };

  return (
    <div className="flex flex-col justify-between items-center gap-4 p-2 w-full mx-auto">
      <button
        className={`w-full mx-auto hover:scale-105 cursor-pointer transition duration-300 ease-in-out px-4 py-2 rounded-xl ${
          active === 0 ? "bg-rose-400 text-white" : "bg-gray-100"
        }`}
        onClick={() => handleClick(0)}
      >
        Stories List
      </button>

      <button
        className={`w-full mx-auto hover:scale-105 cursor-pointer transition duration-300 ease-in-out px-4 py-2 rounded-xl ${
          active === 1 ? "bg-rose-400 text-white" : "bg-gray-100"
        }`}
        onClick={() => handleClick(1)}
      >
        Create Story
      </button>
    </div>
  );
}

export default DashboardContent;
