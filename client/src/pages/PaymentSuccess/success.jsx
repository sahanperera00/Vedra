import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PmtSuccess = () => {
  //Order related Content
  const orderId = useParams().id;
  const [order, setOrder] = useState({});

  //Payment related content
  const [invoiceNo, setInvoiceNo] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [pmtDate, setPmtDate] = useState("");
  const [email, setEmail] = useState("");
  const [grossPrice, setGrossPrice] = useState();
  const [shipping, setShipping] = useState();
  const [netPrice, setNetPrice] = useState();

  //retrieving the order Content

  const getOrder = async (orderId) => {
    try {
      //const orderId = '6438fa2c518a57cbd5bdc8f4';
      await axios
        .get(`http://localhost:8070/orders/${orderId}`)
        .then((res) => {
          setOrder(res.data);
          setInvoiceNo(`INV ${res.data._id}`);
          setOrderNo(res.data._id);
          setPmtDate(new Date().toLocaleDateString());
          setEmail(res.data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //Creating the payment
  const createPayment = async () => {
    const payment = {
      invoiceNo,
      orderNo,
      pmtDate,
      email,
      grossPrice,
      netPrice,
    };
    await axios
      .post("http://localhost:8070/payment/create", payment)
      .then((res) => {
        toast.success(
          "Payment Successful! An Invoice will be sent to you shortly."
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getOrder(orderId);
  }, []);

  useEffect(() => {
    let value = localStorage.getItem("shippingChoice");
    setShipping(parseFloat(value));
  }, [shipping]);

  useEffect(() => {
    setGrossPrice(parseFloat(order.total));
  }, [getOrder]);

  useEffect(() => {
    setNetPrice(grossPrice + shipping);
  }, [getOrder]);

  useEffect(() => {
    //Payment will only work if netPrice is set
    createPayment();
  }, [netPrice]);

  //This page should initially handle all the payment related content and status redirections
  const id = useParams().id;
  const orderStatus = async (req) => {
    console.log(id);
    const status = "Pending";
    try {
      await axios
        .patch(`http://localhost:8070/orders/updateStatus`, { id, status })
        .then((res) => {
          console.log("Order After Status Update:", res.data);
          console.log("order Status Updated");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    orderStatus();
  }, [createPayment]);

  return (
    <div className="bg-gray-100 h-screen">
      <ToastContainer />
      <div className="bg-white p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day! </p>
          <div className="py-10 text-center">
            <Link
              to="/"
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PmtSuccess;
