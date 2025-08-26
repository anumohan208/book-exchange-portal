import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/BooksHome.css";

const BooksHome = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  return (
    <div className="books-home-container">
      <h2 className="page-title">Book Exchange Portal</h2>
      <div className="books-grid">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="book-card">
              <img
                src={book.coverImageUrl || "https://via.placeholder.com/200"}
                alt={book.tittle}
                className="book-image"
              />
              <div className="book-details">
                <h4>{book.tittle}</h4>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Condition:</strong> {book.conditionStatus}</p>
                <p><strong>Available:</strong> {book.available ? "Yes" : "No"}</p>
                <p><strong>Owner:</strong> {book.owner || "N/A"}</p>
                <p className="description">{book.description}</p>
                <div className="card-actions">
                  <Link to={`/books/${book.id}`} className="details-btn">
                    View Details
                  </Link>
                  <button
                    className="borrow-btn"
                    disabled={!book.available}
                  >
                    {book.available ? "Borrow" : "Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No books available right now.</p>
        )}
      </div>
    </div>
  );
};

export default BooksHome;
