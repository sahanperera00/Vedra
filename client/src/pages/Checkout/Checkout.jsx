import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link,useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

export default function Checkout() {

  const orderId = useParams().id;
  const [order, setOrder] = useState({});  //sets order details to this state
  const [orderItems, setOrderItems] = useState([]); //retrieving the order Items

  const [shipping,setShipping] = useState(0);
  const [subTotal,setSubTotal] = useState(0);

  //publishable key for Vedran's Stripe account
  const pmtKey = "pk_test_51MwfKHDtOg3Q5sN3OTX8k5fywchFMqv9sy758Q8M8hXDpucAadXrkdN33IluVD0eeaf8bNEt0jzxXH0OVRBbqYo400lE3qUaIP";
  //retrieving the order Content
  const getOrder = async (orderId) => {
    try {
      //const orderId = '6438fa2c518a57cbd5bdc8f4';
      await axios.get(`http://localhost:8070/orders/${orderId}`)
        .then((res) => {
          setOrder(res.data);
          setOrderItems(res.data.items);

          setSubTotal(res.data.total);

        }).catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }


  const handlePmtToken = async () => {
    
    await axios.post("http://localhost:8082/payment/pay",{orderItems, orderId}).then((res)=>{
      if(res.data.url){
        window.location.href = res.data.url;
      }
    }).catch((err)=>{
      console.log('Error of HandlePmtToken: ',err.message);
    });
    //console.log(response.status);
  }

  useEffect(() => {
    getOrder(orderId);
    console.log(order);
  },[])

  useEffect(()=>{
    localStorage.setItem('shippingChoice',JSON.stringify(shipping));
  },[shipping]);
  

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          Checkout
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base px-[100px]">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <Link
                  to="/cart"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                >
                  1
                </Link>
                <span className="font-semibold text-gray-900">Cart</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <Link
                  to="/checkout"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-[#278a9e] text-xs font-semibold text-white ring ring-[#278a9e] ring-offset-2"
                >
                  2
                </Link>
                <span className="font-semibold text-gray-900">Checkout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:px-20 xl:px-32 mb-[100px]">
        <div className="px-4 pt-8">
          <p className="text-2xl font-bold">Order Summary</p>
          {orderItems.map((data, key) => {
            return (
              <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6" key={key}>
                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={data.image}
                    alt={data.name}
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{data.name}
                    </span>
                    <span className="float-right text-gray-400">Quantity {data.quantity}</span>
                    <p className="text-lg font-bold">${(data.quantity*data.price).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )
          })}
          <p className="mt-8 text-2xl font-bold">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                value={15}
                onChange={(e)=>setShipping(parseFloat(15))}
              />

              <span className="peer-checked:border-[#278a9e] absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-[#278a9e] peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img 
                  className="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold" >Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6" >
                    Delivery: 1 - 2 days
                  </p>
                  <p>
                  ${(15.000).toFixed(2)}
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                value={0}
                onChange={(e)=>setShipping(parseFloat(0))}
              />
              <span className="peer-checked:border-[#278a9e] absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-[#278a9e] peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img 
                  className="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div className="ml-5" >
                  <span className="mt-2 font-semibold"  >Standard Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 7 - 15 Days
                    
                  </p>
                  <p>
                  Free Shipping
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-2xl font-bold">Payment Details</p>
          <div className="">
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">{`$ ${(subTotal).toFixed(2)} `}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">${(shipping).toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">${(subTotal + shipping).toFixed(2)}</p>
            </div>
          </div>
          <div className="justify-center text-right">

            
            <button onClick={handlePmtToken} className="bg-[#3ea7ac] hover:bg-[#278a9e] text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center mt-7">
              Place Order
            </button>
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
