import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CreateBook.css";

const CreateBook = () => {
  const [state, setState] = useState({
    tittle: "",  
    description: "",
    conditionStatus: "Good",
    available: true,
    owner: "",
    addedDate: "",
    bookImage: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setState((prevState) => ({ ...prevState, bookImage: e.target.files[0] }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!state.tittle.trim()) newErrors.tittle = "Book title is required.";
    if (!state.author.trim()) newErrors.author = "Author is required.";
    if (!state.description.trim())
      newErrors.description = "Description is required.";
    if (!state.conditionStatus.trim())
      newErrors.conditionStatus = "Condition is required.";
    if (!state.owner.trim()) newErrors.owner = "Owner name is required.";
    if (!state.addedDate.trim()) newErrors.addedDate = "Date is required.";
    if (!state.bookImage) newErrors.bookImage = "Cover image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    navigate("/books");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("tittle", state.tittle);
    formData.append("author", state.author);
    formData.append("description", state.description);
    formData.append("conditionStatus", state.conditionStatus);
    formData.append("available", state.available);
    formData.append("owner", state.owner);
    formData.append("addedDate", state.addedDate);
    formData.append("bookImage", state.bookImage);

    try {
      await axios.post("http://localhost:8080/api/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/books");
    } catch (error) {
      console.error("Error creating book", error);
    }
  };

  return (
    <div className="create-book-container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="tittle"
            value={state.tittle}
            onChange={handleInputChange}
          />
          {errors.tittle && <span className="error">{errors.tittle}</span>}
        </label>

        <label>
          Author:
          <input
            type="text"
            name="author"
            value={state.author}
            onChange={handleInputChange}
          />
          {errors.author && <span className="error">{errors.author}</span>}
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={state.description}
            onChange={handleInputChange}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </label>

        <label>
          Condition:
          <select
            name="conditionStatus"
            value={state.conditionStatus}
            onChange={handleInputChange}
          >
            <option value="New">New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>
          {errors.conditionStatus && (
            <span className="error">{errors.conditionStatus}</span>
          )}
        </label>

        <label>
          Available:
          <input
            type="checkbox"
            name="available"
            checked={state.available}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Owner:
          <input
            type="text"
            name="owner"
            value={state.owner}
            onChange={handleInputChange}
          />
          {errors.owner && <span className="error">{errors.owner}</span>}
        </label>

        <label>
          Added Date:
          <input
            type="date"
            name="addedDate"
            value={state.addedDate}
            onChange={handleInputChange}
          />
          {errors.addedDate && <span className="error">{errors.addedDate}</span>}
        </label>

        <label>
          Cover Image:
          <input type="file" name="bookImage" onChange={handleImageChange} />
          {errors.bookImage && (
            <span className="error">{errors.bookImage}</span>
          )}
        </label>

        <button type="submit">Add Book</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
