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
import PendingOrders from "./pages/AdminDashboard/PendingOrders";
import ConfirmedOrders from "./pages/AdminDashboard/ConfirmedOrders";
import DispatchedOrders from "./pages/AdminDashboard/DispatchedOrders";
import SellerDash from "./pages/SellerDashboard/SellerDash";
import ItemManagement from "./pages/SellerDashboard/ItemManagement";
import AddItemForm from "./pages/SellerDashboard/AddItemForm";
import UpdateItemForm from "./pages/SellerDashboard/UpdateItemForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pr/:id" element={<Product />} />


        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        <Route path="/item/:id" element={<ItemView />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Devs: Add your routes here*/}
        <Route path="/client" element={<ClientDash />} />
        <Route path="/template" element={<PageTemplate />} />
        



















         

        
         <Route path="/admin" element={<AdminDash />} />
          <Route path="/pending" element={<PendingOrders />} />
          <Route path="/confirmed" element={<ConfirmedOrders />} />
          <Route path="/dispatched" element={<DispatchedOrders />} />





















         

        {/* Nashie Pooh: Add your routes here*/}
         
          <Route path="/seller" element={<SellerDash/>} />
          <Route path="/itemmanagement" element={<ItemManagement/>} />
          <Route path="/additem" element={<AddItemForm/>} />  
          <Route path="/updateitem" element={<UpdateItemForm/>} />  
















         

        {/* You bullshit Shaggy: Add your routes here
         




















         
         */}
      </Routes>
    </div>
  );
}

export default App;
