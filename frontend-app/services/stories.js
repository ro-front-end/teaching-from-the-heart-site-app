import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import URL from "../utils/config";

const baseQuery = fetchBaseQuery({
  baseUrl: URL,
  prepareHeaders: (headers, { endpoint }) => {
    const authEndpoints = ["createStory", "deleteStory", "editStory"];
    if (authEndpoints.includes(endpoint)) {
      const token = localStorage.getItem("authToken");
      console.log("Token for", endpoint, ":", token); // <--- Log aquí
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

export const storiesApi = createApi({
  reducerPath: "storiesApi",
  baseQuery,
  endpoints: (build) => ({
    getStories: build.query({
      query: () => "stories",
    }),
    createStory: build.mutation({
      query: (newstory) => ({
        url: "stories",
        method: "POST",
        body: newstory,
      }),
    }),
    deleteStory: build.mutation({
      query: (storyId) => ({
        url: `stories/${storyId}`,
        method: "DELETE",
      }),
    }),
    editStory: build.mutation({
      query: ({ storyId, updateData }) => ({
        url: `stories/${storyId}`,
        method: "PUT",
        body: updateData,
      }),
    }),
  }),
});

export const {
  useGetStoriesQuery,
  useCreateStoryMutation,
  useDeleteStoryMutation,
  useEditStoryMutation,
} = storiesApi;
