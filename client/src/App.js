import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import ClientDash from "./pages/ClientDashboard/ClientDash";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pr/:id" element={<Product />} />
        <Route path="/user" element={<ClientDash />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
