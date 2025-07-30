import { Link, useParams } from "react-router-dom";
import { useGetStoriesQuery } from "../services/stories";
import { FaArrowLeft } from "react-icons/fa";

function StoriesDetails() {
  const { id } = useParams();
  const { data: stories, isLoading, error } = useGetStoriesQuery();

  if (isLoading)
    return (
      <p className="text-center py-8 text-emerald-500">Loading story...</p>
    );

  if (error)
    return (
      <p className="text-center py-8 text-rose-500">Error loading story</p>
    );

  const story = stories?.find((story) => story.id === id);

  if (!story)
    return <p className="text-center py-8 text-rose-500">Story not found</p>;

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center blur-md brightness-75"
        style={{ backgroundImage: `url(${story.imageOne})` }}
      ></div>

      <div className="relative p-4 sm:p-8 z-10">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-rose-300 hover:text-rose-500 transition duration-300 ease-in-out mb-6"
        >
          <FaArrowLeft />
          <span>Go back</span>
        </Link>

        <div className="max-w-2xl mx-auto m-8 text-white">
          <h2 className="text-center text-3xl sm:text-4xl font-bold mb-8 drop-shadow-lg">
            {story.title}
          </h2>

          <div className="bg-white bg-opacity-90 flex flex-col gap-8 text-gray-800 rounded-xl shadow-lg p-6 mb-8">
            {story.imageTwo && (
              <img
                className="w-full max-w-2xl mx-auto h-64 object-cover rounded-xl mb-4"
                src={story.imageTwo}
                alt={`${story.title} - Image 2`}
              />
            )}
            <p className="leading-relaxed mb-4">{story.contentOne}</p>

            {story.imageThree && (
              <img
                className="w-full max-w-2xl mx-auto h-64 object-cover rounded-xl"
                src={story.imageThree}
                alt={`${story.title} - Image 3`}
              />
            )}
            {story.contentTwo && (
              <p className="leading-relaxed">{story.contentTwo}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoriesDetails;
