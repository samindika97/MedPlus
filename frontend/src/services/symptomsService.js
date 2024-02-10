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
        url: `${ApiSlug.SYMPTOMS}/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["symptoms"],
    }),
    deleteSymptom: builder.mutation({
      query: (data) => ({
        url: `${ApiSlug.SYMPTOMS}/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["symptoms"],
    }),
    getAssociatedDiseases: builder.query({
      query: (data) => `${ApiSlug.SYMPTOMS_ASSOCIATED_DISEASES}/${data.id}`,
    }),
    symptomSearch: builder.query({
      query: (data) => `${ApiSlug.SYMPTOMS_SEARCH}?${data.string}`,
    }),
  }),
});

export const {
  useLazyGetSymptomsQuery,
  useAddSymptomMutation,
  useDeleteSymptomMutation,
  useEditSymptomMutation,
  useLazyGetAssociatedDiseasesQuery,
  useLazySymptomSearchQuery,
} = symptomServiceApi;
