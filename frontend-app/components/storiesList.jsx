import { Link } from "react-router-dom";
import {
  useDeleteStoryMutation,
  useGetStoriesQuery,
} from "../services/stories";
import useAuthHook from "../utils/authHook";
import { FaPencilAlt, FaTimes, FaTrash } from "react-icons/fa";

function StoriesList() {
  const { data: stories, isLoading, error } = useGetStoriesQuery();
  const [deleteStory] = useDeleteStoryMutation();

  const { user } = useAuthHook();

  const handleDeleteStory = async (id) => {
    if (window.confirm("Are you sure you want to delete this story?"))
      try {
        await deleteStory(id).unwrap();
      } catch (error) {
        alert("Error deleting story", error.message);
      }
  };

  if (isLoading)
    return (
      <p className="text-center py-8 text-emerald-500">Loading stories...</p>
    );

  if (error)
    return (
      <p className="text-center py-8 text-rose-500">Error loading stories</p>
    );

  return (
    <>
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm -z-10"></div>
      <h2 className="text-rose-500 bg-emerald-100 p-4 w-full mx-auto font-bold uppercase text-3xl lg:text-4xl m-6 mb-10 text-center tracking-wide">
        Stories
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stories?.map((story) => (
          <li
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 overflow-hidden border border-rose-100"
            key={story.id}
          >
            <div className="flex flex-col h-full">
              <div className="relative">
                <img
                  className="w-full h-64 sm:h-72 md:h-80 object-cover"
                  src={story.imageOne}
                  alt={story.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-rose-950 font-bold text-lg mb-2 text-center leading-tight">
                  {story.title}
                </h3>
                <div className="mt-auto flex flex-col justify-center gap-4">
                  <Link to={`/dashboard/${story.id}`} className="block h-full">
                    <p className="text-center bg-rose-400 hover:bg-rose-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                      Read Story
                    </p>
                  </Link>
                  {user && (
                    <div className="flex justify-center w-full gap-4">
                      <button
                        type="button"
                        className="w-full text-center flex justify-center bg-emerald-300 cursor-pointer hover:bg-emerald-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        <FaPencilAlt className="text-center" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteStory(story.id)}
                        className="w-full text-center flex justify-center bg-neutral-400 cursor-pointer hover:bg-rose-900 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        <FaTrash className="text-center" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default StoriesList;
