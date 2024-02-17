import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDisplay from "./Pages/BookDisplay";
import BookListPage from "./Pages/BookListPage";
function App() {
  return (
    <div className="App">
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/book/:id" element={<BookDisplay />} />
            <Route path="/" element={<BookListPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
