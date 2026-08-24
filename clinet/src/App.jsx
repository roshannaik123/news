import React from "react";
import Navbar from "./components/Navbar";
import LiveNewsTicker from "./features/news/components/LiveNewsTicker";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewsDetails from "./pages/NewsDetails";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <LiveNewsTicker />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
