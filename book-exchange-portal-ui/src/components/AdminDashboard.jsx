import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  const handleDelete = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`http://localhost:8080/api/admin/books/${bookId}`);
        fetchBooks();
      } catch (error) {
        console.error("Error deleting book", error);
      }
    }
  };

  const handleEdit = (bookId) => {
    navigate(`/admin/books/edit/${bookId}`);
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Operations</h2>
      <div className="dashboard-actions">
        <Link to="/books/create" className="btn btn-primary">
          Add New Book
        </Link>
      </div>

      <table className="table table-striped table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Author</th>
            <th>Condition</th>
            <th>Available</th>
            <th>Owner</th>
            <th>Added Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id}>
                <td>
                  <img
                    src={book.coverImageUrl || "https://via.placeholder.com/80"}
                    alt={book.tittle}
                    style={{ width: "60px", height: "80px", objectFit: "cover" }}
                  />
                </td>
                <td>{book.tittle}</td>
                <td>{book.author}</td>
                <td>{book.conditionStatus}</td>
                <td>{book.available ? "Yes" : "No"}</td>
                <td>{book.owner}</td>
                <td>{book.addedDate}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(book.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
