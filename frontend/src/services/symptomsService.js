import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./api";
import { ApiSlug } from "../utils/apiSlug";

export const symptomServiceApi = createApi({
  reducerPath: "symptomService",
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({
    getSymptoms: builder.query({
      query: () => ApiSlug.SYMPTOMS,
      providesTags: ["symptoms"],
    }),
    addSymptom: builder.mutation({
      query: (data) => ({
        url: ApiSlug.SYMPTOMS,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["symptoms"],
    }),
    editSymptom: builder.mutation({
      query: (data) => ({
        url: ApiSlug.SYMPTOMS,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["symptoms"],
    }),
    deleteSymptom: builder.mutation({
      query: (data) => ({
        url: ApiSlug.SYMPTOMS,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["symptoms"],
    }),
  }),
});

export const {
  useLazyGetSymptomsQuery,
  useAddSymptomMutation,
  useDeleteSymptomMutation,
  useEditSymptomMutation,
} = symptomServiceApi;
