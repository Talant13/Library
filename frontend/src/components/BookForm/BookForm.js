import React, { useState } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
// import { v4 as uuidv4 } from "uuid";
import "./BookForm.css";
import booksData from "../../data/books.json";
// import { addBook } from "../../redux/books/actionCreators";
import {
  addBook,
  fetchBook,
  selectIsLoadingViaAPI,
} from "../../redux/slices/booksSlice";
import { setError } from "../../redux/slices/errorSlice";
import createNewBook from "../../utils/createNewBook";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI);
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    const fullBook = createNewBook(randomBook, "random");
    // const fullBook = {
    //   ...randomBook,
    //   id: uuidv4(),
    //   isFavorite: false,
    // };
    dispatch(addBook(fullBook));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      const book = createNewBook({ title, author }, "manual");
      // const book = {
      //    id: uuidv4(),
      //   title: title,
      //   author: author,
      //    isFavorite: false,
      // };
      dispatch(addBook(book));

      setTitle("");
      setAuthor("");
    } else {
      dispatch(setError("You must fill Title and Author"));
    }
  };

  const handleAddRandomBookViaAPI = () => {
    dispatch(fetchBook("http://localhost:4000/random-book-delayed"));
  };
  return (
    <div className="app-block book-form">
      <h2>Add a new Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Random
        </button>

        <button
          type="button"
          onClick={handleAddRandomBookViaAPI}
          disabled={isLoadingViaAPI}>
          {isLoadingViaAPI ? (
            <>
              <span>Loading...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            "Add random via API"
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
