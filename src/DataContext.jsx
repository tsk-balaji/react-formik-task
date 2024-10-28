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
  ];

  const [books, setBooks] = useState(defaultBooks);
  const [authors, setAuthors] = useState(defaultAuthors);

  return (
    <DataContext.Provider value={{ books, setBooks, authors, setAuthors }}>
      {children}
    </DataContext.Provider>
  );
};
