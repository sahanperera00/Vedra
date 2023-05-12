import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Order = () => {
  
    const [order, setOrder] = useState({});
  const [status,setStatus] = useState("");

  

  const orderId = useParams().id;
  const getOrder = async () => {
    await axios
      .get(`http://localhost:8070/orders/${orderId}`)
      .then((res) => {
        setOrder(res.data);
        setStatus(res.data.status);
        console.log("Order", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOrder();
  }, []);

  const [color,setColor] = useState("");
  useEffect(()=>{
      if(order.status === "Pending"){
          setColor("text-yellow-500");
      }else if(order.status==="Confirmed"){
          setColor("text-green-300");
      }else if(order.status==="Dispatched"){
          setColor("text-green-400");
      }else if(order.status==="Refunded"){
          setColor("text-red-500");
      }else if(order.status === "Rejected"){
          setColor("text-red-700");}
  },[getOrder])


  return (
    <div>
        <Navbar/>
      {" "}

      <div className="flex flex-row">
          <h1 className="text-2xl font-bold text-gray-800 ml-40">Order Status:</h1>
           <h1 className={`text-2xl font-bold ${color} ml-4`}>{status}</h1>
        </div>
      <div className="mb-[200px] w-[100vw] flex justify-center">
        <div className="flex my-7 justify-between w-[85%]">
          <div className="w-[63%] h-max px-10 py-3 rounded-[20px] shadow-md bg-white">
            <table className="w-[100%]">
              <thead>
                <tr className="w-[100%] bg-blue h-[70px] pb-9">
                  <th className="font-semibold text-gray-600 text-m w-[30%]">
                    Product Details
                  </th>
                  <th className="font-semibold text-gray-600 text-m w-[30%]">
                    Quantity
                  </th>
                  <th className="font-semibold text-gray-600 text-m w-[20%]">
                    Price
                  </th>
                  <th className="font-semibold text-gray-600 text-m w-[20%]">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {order &&
                  order.items &&
                  order.items.map((item, index) => (
                    <tr className="w-[100%] hover:bg-gray-100 border-t h-[130px]">
                      <>
                        <td className="h-full">
                          <div className="flex w-full">
                            <div className="w-[130px]">
                              <img
                                className="pl-[12px]"
                                src={
                                  item.image &&
                                  item.image.length > 0 &&
                                  item.image
                                }
                                alt=""
                              />
                            </div>
                            <div className="flex flex-col justify-evenly ml-4 flex-grow">
                              <span className="text-sm">{item.name}</span>
                            </div>
                          </div>
                        </td>
                            
                        <td className="h-full ">
                          <span className="text-center flex items-center justify-center text-m">
                            {item.quantity}
                          </span>
                        </td>
                        <td className="h-full ">
                          <span className="text-center flex items-center justify-center text-m">
                            ${item.price.toFixed(2)}
                          </span>
                        </td>
                        <td className="h-full">
                          <span className="text-center flex items-center justify-center text-m">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </td>
                      </>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div id="summary" className="w-[35%] h-max px-8 py-3 rounded-[20px]">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            {order &&
              order.items &&
              order.items.map((item) => (
                <div className="flex justify-between mt-10 mb-5">
                  <span className=" text-m w-[350px]">{item.name}</span>
                  <span className=" text-m">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-m ">
                <span>Total Cost</span>

                <span className="text-xl">
                  $
                  {order &&
                    order.items &&
                    order.items
                      .reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                </span>
              </div>

              <Link to={`/orders`}>
                <button className="bg-[#3ea7ac] hover:bg-[#278a9e] text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center w-full mt-2">
                  Back to Orders
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Order;
