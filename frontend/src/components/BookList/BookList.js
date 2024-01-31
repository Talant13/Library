import React from "react";
import { BsBookmarkStar } from "react-icons/bs";
import { BsBookmarkStarFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import "./BookList.css";
import { deleteBook } from "../../redux/books/actionCreators";
import { toggleFavorite } from "../../redux/books/actionCreators";

const BookList = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleToggle = (id) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <div className="app-block book-list">
      <h2>Books List</h2>
      {books.length === 0 ? (
        <p>No books in Library</p>
      ) : (
        <ul>
          {books.map((book, i) => {
            return (
              <li key={book.id}>
                <div className="book-info">
                  {++i}. "{book.title}" by <strong>{book.author}</strong>
                </div>
                <div className="book-actions">
                  <span onClick={() => handleToggle(book.id)}>
                    {book.isFavorite ? (
                      <BsBookmarkStarFill className="star-icon" />
                    ) : (
                      <BsBookmarkStar className="star-icon" />
                    )}
                  </span>

                  <button onClick={() => dispatch(deleteBook(book.id))}>
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BookList;
