// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import BookData from "./BookData";
import AuthorData from "./AuthorData";
import { DataProvider } from "./DataContext";

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/BookData" element={<BookData />} />
        <Route path="/AuthorData" element={<AuthorData />} />
      </Routes>
    </DataProvider>
  );
}

export default App;
