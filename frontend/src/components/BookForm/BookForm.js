import React, { useState } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import "./BookForm.css";
import booksData from "../../data/books.json";
// import { addBook } from "../../redux/books/actionCreators";
import { addBook, fetchBook } from "../../redux/slices/booksSlice";
import createNewBook from "../../utils/createNewBook";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
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
    }
  };

  const handleAddRandomBookViaAPI = () => {
    dispatch(fetchBook());
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
        <button type="button" onClick={handleAddRandomBookViaAPI}>
          Add random via API
        </button>
      </form>
    </div>
  );
};

export default BookForm;
