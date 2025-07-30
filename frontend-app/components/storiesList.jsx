// src/components/StoriesList.jsx

import { Link } from "react-router-dom";
import {
  useGetStoriesQuery,
  useDeleteStoryMutation,
} from "../services/stories";
import useAuthHook from "../utils/authHook";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

function StoriesList() {
  const { data: stories = [], isLoading, error } = useGetStoriesQuery();
  const [deleteStory] = useDeleteStoryMutation();
  const { user } = useAuthHook();

  const handleDeleteStory = async (id) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      try {
        await deleteStory(id).unwrap();
      } catch (err) {
        alert("Error deleting story: " + (err.message || "Unknown error"));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-emerald-600 text-xl font-medium">
          Loading stories...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-rose-600 text-xl font-medium">
          Failed to load stories.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Subtle background */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-rose-50 -z-10"></div>

      {/* Title */}

      {/* Stories Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
        {stories.length === 0 ? (
          <li className="col-span-full text-center text-gray-500 py-12">
            <p className="text-lg">📝 No stories available yet.</p>
          </li>
        ) : (
          stories.map((story) => (
            <li
              key={story.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-rose-100 overflow-hidden transition-all duration-300 transform hover:scale-105 flex flex-col"
            >
              {/* Image with overlay */}
              <div className="relative h-64">
                <img
                  src={story.imageOne}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 right-4 text-white text-lg font-bold line-clamp-2">
                  {story.title}
                </h3>
                {story.category && (
                  <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs px-2.5 py-1 rounded-full">
                    {story.category}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-4">
                {/* Read Story Button */}
                <Link
                  to={`/dashboard/${story.id}`}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 rounded-xl text-center transition-colors duration-200flex items-center justify-center gap-2 mb-4"
                >
                  Read Story <span aria-hidden="true">→</span>
                </Link>

                {/* Edit & Delete Buttons (only if user is logged in) */}
                {user ? (
                  <div className="flex gap-2 mt-auto">
                    <button
                      type="button"
                      onClick={() =>
                        (window.location.href = `/dashboard/${story.id}/edit`)
                      }
                      className="flex-1 bg-gray-100 hover:bg-emerald-500 text-gray-700 p-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center cursor-pointer"
                      aria-label="Edit story"
                    >
                      <FaPencilAlt size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteStory(story.id)}
                      className="flex-1 bg-neutral-500 hover:bg-rose-600 text-white p-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center cursor-pointer"
                      aria-label="Delete story"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                ) : (
                  <p className="bg-rose-100 p-4 text-xs">
                    Users may edit or delete a story
                  </p>
                )}

                {/* Placeholder to keep spacing consistent */}
                {!user && <div className="h-10"></div>}
              </div>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default StoriesList;
