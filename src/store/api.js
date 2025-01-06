import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const COHORT_CODE = "2409-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT_CODE}/players`;

// DONE: configure createApi to use API_URL as the base URL
// DONE: add "Puppy" as a tag type.

const api = createApi({
  reducerPath: "puppyApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Puppy"],
  endpoints: (builder) => ({
    getPuppies: builder.query({
      query: () => "",
      transformResponse: (response) => response.data.players, // Extract the 'players' array from response data
      providesTags: ["Puppy"],
    }),
    getPuppyDetails: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: "Puppy", id }],
    }),
    addPuppy: builder.mutation({
      query: (newPuppy) => ({
        url: "",
        method: "POST",
        body: newPuppy,
      }),
      invalidatesTags: ["Puppy"],
    }),
    removePuppy: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Puppy"],
    }),
  }),
});

export const {
  useGetPuppiesQuery,
  useGetPuppyDetailsQuery,
  useAddPuppyMutation,
  useRemovePuppyMutation,
} = api;

export default api;
