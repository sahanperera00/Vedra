import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import ClientDash from "./pages/ClientDashboard/ClientDash";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";
import ItemView from "./pages/ShoppingCart/ShoppingCart";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import Checkout from "./pages/Checkout/Checkout";
import PageTemplate from "./pages/PageTemplate";
import AdminDash from './pages/AdminDashboard/AdminDash';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pr/:id" element={<Product />} />
        <Route path="/client" element={<ClientDash />} />
        <Route path="/template" element={<PageTemplate />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        <Route path="/item/:id" element={<ItemView />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Devs: Add your routes here





















         */}

        {/* Poopy: Add your routes here*/
         <Route path="/admin" element={<AdminDash />} />





















         /******************* */}

        {/* Nashie Pooh: Add your routes here
         




















         */}

        {/* You bullshit Shaggy: Add your routes here
         




















         
         */}
      </Routes>
    </div>
  );
}

export default App;
