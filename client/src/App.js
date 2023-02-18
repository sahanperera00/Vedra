import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import ClientDash from "./pages/ClientDashboard/ClientDash";



function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pr/:id" element={<Product />} />
          <Route path="/user" element ={<ClientDash/> } />
        </Routes>
    </div>
  );
}

export default App;
