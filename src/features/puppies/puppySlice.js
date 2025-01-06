import { createSlice } from "@reduxjs/toolkit";
import api from "../../store/api";

/*
TODO: Define the following 4 endpoints:
  1. getPuppies (query)
  2. getPuppy (query)
  3. addPuppy (mutation)
  4. deletePuppy (mutation)

The query endpoints should provide the "Puppy" tag.
The mutation endpoints should invalidate the "Puppy" tag.

(Optional) TODO: Write `transformResponse` and `transformErrorResponse`
functions for each endpoint.
*/

const puppyApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPuppies: build.query({
      query: () => "players",
      providesTags: ["Puppy"],
      transformResponse: (response) => response?.data?.players || [],
    }),
    getPuppy: build.query({
      query: (id) => `players/${id}`,
      providesTags: (result, error, id) => [{ type: "Puppy", id }],
    }),
    addPuppy: build.mutation({
      query: (newPuppy) => ({
        url: "players", // Matches API structure
        method: "POST",
        body: newPuppy,
      }),
      invalidatesTags: ["Puppy"],
    }),
    deletePuppy: build.mutation({
      query: (id) => ({
        url: `players/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Puppy", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPuppiesQuery,
  useGetPuppyQuery,
  useAddPuppyMutation,
  useDeletePuppyMutation,
} = puppyApi;

const initialState = {
  puppies: [],
  selectedPuppyId: null,
};

const puppySlice = createSlice({
  name: "puppies",
  initialState,
  reducers: {
    setSelectedPuppyId: (state, action) => {
      state.selectedPuppyId = action.payload;
    },
  },
});

export const { setSelectedPuppyId } = puppySlice.actions;

export default puppySlice.reducer;
export { puppyApi };
