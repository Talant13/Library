import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  author: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      // return {...state, title: action.payload } || HAVE TO RETURN NEW STATE (CAN DO THIS)
      state.title = action.payload; //|| TOOLKIT ALLOWS TO MUTATE STATE (IMMER lib)
    },
    setAuthorFilter: (state, action) => {
      state.author = action.payload;
    },
    resetFilters: (state) => {
      //state.title = ""
      return initialState;
    },
  },
});
export const { setTitleFilter, setAuthorFilter, resetFilters } =
  filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;

export default filterSlice.reducer;
