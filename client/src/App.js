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
import AdminDash from "./pages/AdminDashboard/AdminDash";
import PendingOrders from "./pages/AdminDashboard/PendingOrders";
import ConfirmedOrders from "./pages/AdminDashboard/ConfirmedOrders";
import DispatchedOrders from "./pages/AdminDashboard/DispatchedOrders";
import SellerDash from "./pages/SellerDashboard/SellerDash";
import ItemManagement from "./pages/SellerDashboard/ItemManagement";
import AddItemForm from "./pages/SellerDashboard/AddItemForm";
import UpdateItemForm from "./pages/SellerDashboard/UpdateItemForm";
import PmtSuccess from "./pages/PaymentSuccess/success";
import ClientPayments from "./pages/ClientDashboard/ClientPayments";
import Unsuccesful from "./pages/Checkout/Unsuccesful";
import SellerPayments from "./pages/SellerDashboard/SellerPayments";
import ComingSoon from "./pages/ComingSoon/ComingSoon";
import ClientOrders from "./pages/ClientDashboard/ClientOrders";
import Order from "./pages/ClientDashboard/Order";
import Payment from "./pages/ClientDashboard/Payment";
import RefundedOrders from "./pages/AdminDashboard/Refunded";
import ProvisionReport from "./pages/SellerDashboard/ProvisionReport";
import ItemReport from "./pages/SellerDashboard/ItemReport";
import OrderReport from "./pages/ClientDashboard/OrderReport";

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

        {/* Devs: Add your routes here*/}
        <Route path="/client" element={<ClientDash />} />
        <Route path="/template" element={<PageTemplate />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/pmtsuccess/:id" element={<PmtSuccess />} />
        <Route path="/failed" element={<Unsuccesful />} />
        <Route path="/mypayments" element={<ClientPayments />} />
        <Route path="/orderReport" element={<OrderReport />} />
        {/* Test method to fetch item information */}
        <Route
          path="/checkout/:6438fa2c518a57cbd5bdc8f4"
          element={<Checkout />}
        />
        <Route path="/sellerPay" element={<SellerPayments />} />
        <Route path="/comingSoon" element={<ComingSoon />} />
        <Route path="/orders" element={<ClientOrders />} />
        <Route path="/orders/:id" element={<Order />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/refunded" element={<RefundedOrders />} />

        <Route path="/admin" element={<AdminDash />} />
        <Route path="/pending" element={<PendingOrders />} />
        <Route path="/confirmed" element={<ConfirmedOrders />} />
        <Route path="/dispatched" element={<DispatchedOrders />} />

        {/* Nashie Pooh: Add your routes here*/}

        <Route path="/seller" element={<SellerDash />} />
        <Route path="/itemmanagement" element={<ItemManagement />} />
        <Route path="/additem" element={<AddItemForm />} />
        <Route path="/updateitem" element={<UpdateItemForm />} />
        <Route path="/ProvisionReport" element={<ProvisionReport />} />
        <Route path='/itemreport' element={<ItemReport />} />

        {/* You bullshit Shaggy: Add your routes here
         




















         
         */}
      </Routes>
    </div>
  );
}

export default App;
