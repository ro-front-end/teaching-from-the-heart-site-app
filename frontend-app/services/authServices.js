import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import URL from "../utils/config";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (loginValues) => ({
        url: "auth/login",
        method: "POST",
        body: loginValues,
      }),
    }),
    signinUser: build.mutation({
      query: (signinValues) => ({
        url: "auth/signin",
        method: "POST",
        body: signinValues,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useSigninUserMutation } = authApi;
