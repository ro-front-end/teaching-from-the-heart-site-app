import { BASE_URL } from "@/utils/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storiesApi = createApi({
  reducerPath: "storiesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getStories: build.query({
      query: () => "/stories",
    }),
  }),
});

export const { useGetStoriesQuery } = storiesApi;
