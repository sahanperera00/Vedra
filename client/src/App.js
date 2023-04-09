import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import ClientDash from "./pages/ClientDashboard/ClientDash";
import PageTemplate from "./pages/PageTemplate";



function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pr/:id" element={<Product />} />
          <Route path="/client" element ={<ClientDash/> } />
          <Route path="/template" element ={<PageTemplate/>}/>
        </Routes>
    </div>
  );
}

export default App;
