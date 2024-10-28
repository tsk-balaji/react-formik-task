// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from "react";

// Create context
export const DataContext = createContext();

// Create provider component - default value taken from Internet.
export const DataProvider = ({ children }) => {
  // Default authors
  const defaultAuthors = [
    {
      name: "Author One",
      birthDate: "1980-01-01",
      shortBio: "A brief bio of Author One.",
    },
    {
      name: "Author Two",
      birthDate: "1990-05-15",
      shortBio: "A brief bio of Author Two.",
    },
    {
      name: "Author Three",
      birthDate: "2000-10-20",
      shortBio: "A brief bio of Author Three.",
    },
  ];

  // Default books
  const defaultBooks = [
    {
      title: "Book One",
      author: "Author One",
      isbn: "1234567890",
      publicationDate: "2005-03-15",
    },
    {
      title: "Book Two",
      author: "Author Two",
      isbn: "0987654321",
      publicationDate: "2010-07-20",
    },
    {
      title: "Book Three",
      author: "Author Three",
      isbn: "1122334455",
      publicationDate: "2015-11-30",
    },
  ];

  const [books, setBooks] = useState(defaultBooks);
  const [authors, setAuthors] = useState(defaultAuthors);

  return (
    <DataContext.Provider value={{ books, setBooks, authors, setAuthors }}>
      {children}
    </DataContext.Provider>
  );
};
