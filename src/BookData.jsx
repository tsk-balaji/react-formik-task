// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Sidebar from "./SideBar";
import { DataContext } from "./DataContext";

const BookSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  isbn: Yup.string()
    .matches(/^[0-9-]+$/, "ISBN should only contain numbers and hyphens")
    .required("ISBN is required"),
  publicationDate: Yup.date()
    .required("Publication date is required")
    .max(new Date(), "Publication date cannot be in the future"),
});

export default function BookData() {
  const { books, setBooks } = useContext(DataContext);

  const [editIndex, setEditIndex] = useState(null); // Track which book is being edited

  const handleDelete = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleSubmit = (values, { resetForm }) => {
    if (editIndex !== null) {
      // Editing an existing book
      const updatedBooks = books.map((book, i) =>
        i === editIndex ? { ...book, ...values } : book
      );
      setBooks(updatedBooks);
      setEditIndex(null); // Reset edit index after editing
    } else {
      // Adding a new book
      setBooks([...books, values]);
    }
    resetForm();
    alert("Book data submitted successfully!");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div style={{ width: "250px" }}>
        <Sidebar />
      </div>

      <div className="content-container p-4 flex-grow-1">
        <h2 className="text-center my-4">Book Data Management</h2>
        <div className="row">
          <div className="col-md-5">
            <div className="shadow p-4 mb-4 bg-white rounded">
              <Formik
                initialValues={
                  editIndex !== null
                    ? books[editIndex] // Populate form with the selected book
                    : {
                        title: "",
                        author: "",
                        isbn: "",
                        publicationDate: "",
                      }
                }
                validationSchema={BookSchema}
                enableReinitialize={true} // Reinitialize form when editIndex changes
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group mb-3">
                      <label htmlFor="title">Title</label>
                      <Field
                        name="title"
                        type="text"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="author">Author</label>
                      <Field
                        name="author"
                        type="text"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="author"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="isbn">ISBN Number</label>
                      <Field name="isbn" type="text" className="form-control" />
                      <ErrorMessage
                        name="isbn"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="publicationDate">Publication Date</label>
                      <Field
                        name="publicationDate"
                        type="date"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="publicationDate"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {editIndex !== null ? "Update" : "Submit"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <div className="col-md-7">
            <div className="card shadow p-3 bg-white rounded">
              <div className="card-body">
                <h5 className="card-title text-center mb-3">
                  Book Data Records
                </h5>

                <table className="table table-bordered table-hover table-striped">
                  <thead className="table">
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>ISBN</th>
                      <th>Publication Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book, index) => (
                      <tr key={index}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.isbn}</td>
                        <td>{book.publicationDate}</td>
                        <td>
                          <div className="d-flex">
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => handleEdit(index)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(index)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
