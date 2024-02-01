import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      // return [...state, action.payload];
      state.push(action.payload); //IMMER LIB
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
      // const index = state.findIndex((book) => book.id === action.payload)
      // if(index !== -1){
      //   state.splice(index,1)
      // }
    },
    toggleFavorite: (state, action) => {
      // return state.map((book) =>
      //   book.id === action.payload
      //     ? { ...book, isFavorite: !book.isFavorite }
      //     : book
      // );
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
  },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export default booksSlice.reducer;
