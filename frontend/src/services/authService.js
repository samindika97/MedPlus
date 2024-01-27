import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./api";
import { ApiSlug } from "../utils/apiSlug";

export const authServiceApi = createApi({
  reducerPath: "authService",
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: ApiSlug.LOGIN,
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: ApiSlug.SIGN_UP,
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: ApiSlug.FORGOT_PASSWORD,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: ApiSlug.RESET_PASSWORD,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authServiceApi;
