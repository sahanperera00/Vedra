import "./App.css";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Product from "./pages/Product/Product";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pr/:id" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
