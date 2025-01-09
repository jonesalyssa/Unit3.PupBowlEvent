import { createSlice } from "@reduxjs/toolkit";
import api from "../../store/api";

const puppyApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPuppies: build.query({
      query: () => "players",
      providesTags: ["Puppy"],
      transformResponse: (response) => response?.data?.players || [],
    }),
    getPuppyDetails: build.query({
      query: (id) => `players/${id}`,
      providesTags: (result, error, id) => [{ type: "Puppy", id }],
    }),
    addPuppy: build.mutation({
      query: (newPuppy) => ({
        url: "players",
        method: "POST",
        body: newPuppy,
      }),
      invalidatesTags: ["Puppy"],
    }),
    removePuppy: build.mutation({
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
  useGetPuppyDetailsQuery,
  useAddPuppyMutation,
  useRemovePuppyMutation,
} = puppyApi;

const initialState = {
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
