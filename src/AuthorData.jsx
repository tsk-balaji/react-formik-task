// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Sidebar from "./SideBar";
import { DataContext } from "./DataContext";

const AuthorSchema = Yup.object().shape({
  name: Yup.string().required("Author Name is required"),
  birthDate: Yup.date().required("Date Of Birth is required"),
  shortBio: Yup.string().required("Short Bio is required"),
});

export default function AuthorData() {
  const { authors, setAuthors } = useContext(DataContext);

  const [editIndex, setEditIndex] = useState(null);

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  return (
    <div className="container-fluid d-flex p-0">
      <Sidebar /> {/* Sidebar on the left */}
      <div
        className="content-container p-4 ms-auto"
        style={{ flexGrow: 1, maxWidth: "85%" }}
      >
        <h2 className="text-center my-4">Author Data Management</h2>
        <div className="row">
          {/* Form Section */}
          <div className="col-lg-5 mb-4">
            <div className="card shadow p-4 bg-white rounded">
              <h5 className="card-title text-center mb-4">
                {editIndex === null ? "Add New Author" : "Edit Author"}
              </h5>
              <Formik
                initialValues={
                  editIndex !== null
                    ? authors[editIndex]
                    : { name: "", birthDate: "", shortBio: "" }
                }
                enableReinitialize
                validationSchema={AuthorSchema}
                onSubmit={(values, { resetForm }) => {
                  if (editIndex !== null) {
                    const updatedAuthors = [...authors];
                    updatedAuthors[editIndex] = values;
                    setAuthors(updatedAuthors);
                    setEditIndex(null);
                  } else {
                    setAuthors([...authors, values]);
                  }
                  resetForm();
                  alert("Author data submitted successfully!");
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="author-form">
                    <div className="form-container">
                      {/* Name Field */}
                      <div className="form-group mb-3">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <Field
                          name="name"
                          type="text"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>

                      {/* Birth Date Field */}
                      <div className="form-group mb-3">
                        <label htmlFor="birthDate" className="form-label">
                          Date of Birth
                        </label>
                        <Field
                          name="birthDate"
                          type="date"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="birthDate"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>

                      {/* Short Bio Field */}
                      <div className="form-group mb-3">
                        <label htmlFor="shortBio" className="form-label">
                          Short Bio
                        </label>
                        <Field
                          name="shortBio"
                          as="textarea"
                          className="form-control"
                          rows="3"
                        />
                        <ErrorMessage
                          name="shortBio"
                          component="div"
                          className="text-danger mt-1"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="d-flex justify-content-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary px-4"
                          disabled={isSubmitting}
                        >
                          {isSubmitting
                            ? "Submitting..."
                            : editIndex !== null
                            ? "Update"
                            : "Submit"}
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          {/* Table Section */}
          <div className="col-lg-7">
            <div className="card shadow p-4 bg-light rounded">
              <h5 className="card-title text-center mb-3">
                Author Data Records
              </h5>
              <div className="table-responsive">
                <table className="table table-bordered table-hover table-striped">
                  <thead className="table-secondary">
                    <tr>
                      <th>Name</th>
                      <th>Date of Birth</th>
                      <th>Short Bio</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {authors.map((author, index) => (
                      <tr key={index}>
                        <td>{author.name}</td>
                        <td>{author.birthDate}</td>
                        <td>{author.shortBio}</td>
                        <td>
                          <div className="d-flex justify-content-center">
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
              {authors.length === 0 && (
                <p className="text-center text-muted mt-3">
                  No author data available. Add an author to see it here.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
