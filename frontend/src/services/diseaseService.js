import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./api";
import { ApiSlug } from "../utils/apiSlug";

export const diseaseServiceApi = createApi({
  reducerPath: "diseaseService",
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({
    getDiseases: builder.query({
      query: () => ApiSlug.DISEASES,
      providesTags: ["diseases"],
    }),
    getDisease: builder.mutation({
      query: (data) => ({
        url: `${ApiSlug.DISEASES}/${data.id}`,
        method: "GET",
      }),
      invalidatesTags: ["diseases"],
    }),
    addDisease: builder.mutation({
      query: (data) => ({
        url: ApiSlug.DISEASES,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["diseases"],
    }),
    editDisease: builder.mutation({
      query: (data) => ({
        url: `${ApiSlug.DISEASES}/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["diseases"],
    }),
    deleteDisease: builder.mutation({
      query: (data) => ({
        url: `${ApiSlug.DISEASES}/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["diseases"],
    }),
  }),
});

export const {
  useLazyGetDiseasesQuery,
  useGetDiseaseMutation,
  useAddDiseaseMutation,
  useDeleteDiseaseMutation,
  useEditDiseaseMutation,
} = diseaseServiceApi;
