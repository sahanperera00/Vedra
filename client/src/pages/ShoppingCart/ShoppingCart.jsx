import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

export default function ShoppingCart() {
  const [count, setCount] = useState(1);
  const [cart, setCart] = useState({});

  const minusCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addCount = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    async function fetchCart() {
      const email = "abc@gmail.com";
      const status = "cart";
      const response = await fetch(
        `http://localhost:8083/orders/${email}/${status}`
      );
      const data = await response.json();
      setCart(data.order[0]);
    }
    fetchCart();
  }, [cart]);

  return (
    <div className="Shoppingcart">
      <Navbar />
      <div class="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div class="flex flex-row">
          <h1 class="text-2xl font-bold text-gray-800">Shopping Cart</h1>
        </div>
        <div class="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base px-[100px]">
          <div class="relative">
            <ul class="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li class="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-[#278a9e] text-xs font-semibold text-white ring ring-[#278a9e] ring-offset-2"
                  href="#"
                >
                  1
                </a>
                <span class="font-semibold text-gray-900">Cart</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li class="flex items-center space-x-3 text-left sm:space-x-4">
                <Link
                  to={`/checkout/${cart._id}`}
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                >
                  2
                </Link>
                <span class="font-semibold text-gray-900">Checkout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mb-[200px] w-[100vw] flex justify-center">
        <div class="flex my-7 flex justify-between w-[85%]">
          <div class="w-[63%] h-max px-10 py-3 rounded-[20px] shadow-md bg-white">
            <table>
              <thead>
                <tr className="w-full h-[70px] pb-9">
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
                {cart &&
                  cart.items &&
                  cart.items.map((item) => (
                    <tr className="hover:bg-gray-100 border-t h-[160px]">
                      {/* {item && item.quantity && setCount(item.quantity)} */}
                      <>
                        <td className="h-full">
                          <div class="flex w-full">
                            <div class="w-[280px]">
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
                            <div class="flex flex-col justify-evenly ml-4 flex-grow">
                              <span class="text-sm">{item.name}</span>
                              <p
                                class="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
                                onClick={async (e) => {
                                  await axios
                                    .post(
                                      `http://localhost:8083/orders/${cart._id}/removeItem`,
                                      item
                                    )
                                    .then((res) => {
                                      console.log(res);
                                    });
                                }}
                              >
                                Remove
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="h-full">
                          <div className="flex items-center justify-center items-center">
                            <button
                              onClick={(e) => {
                                setCount(minusCount);
                              }}
                              className="focus:outline-none cursor-pointer w-7 h-7 flex items-center justify-center bg-[#3ea7ac] text-white hover:bg-[#278a9e] rounded-l-lg"
                            >
                              -
                            </button>
                            <input
                              id="counter"
                              aria-label="input"
                              className="border border-gray-300 h-full text-center w-14 mx-2"
                              type="text"
                              value={item.quantity}
                              disabled
                            />
                            <button
                              onClick={(e) => {
                                setCount(addCount);
                              }}
                              className="focus:outline-none cursor-pointer w-7 h-7 flex items-center justify-center bg-[#3ea7ac] text-white hover:bg-[#278a9e] rounded-r-lg"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="h-full ">
                          <span class="text-center flex items-center justify-center text-m">
                            ${(item.price).toFixed(2)}
                          </span>
                        </td>
                        <td className="h-full">
                          <span class="text-center flex items-center justify-center text-m">
                            ${(item.price * count).toFixed(2)}
                          </span>
                        </td>
                      </>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div id="summary" class="w-[35%] h-max px-8 py-3 rounded-[20px]">
            <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            {cart &&
                  cart.items &&
                  cart.items.map((item) => (
            <div class="flex justify-between mt-10 mb-5">
            <span class=" text-m w-[350px]">{item.name}</span>
            <span class=" text-m">${(item.price * count).toFixed(2)}</span>
            </div>
                  ))}
            <div class="border-t mt-8">
              <div class="flex font-semibold justify-between py-6 text-m ">
                
                <span>Total Cost</span>
                
                <span className="text-xl">
                ${cart &&
                  cart.items &&
                  cart.items.reduce((acc, item) => acc + item.price * count, 0).toFixed(2)}
                  
                  </span>
                 
              </div>
            
              <Link to={`/checkout/${cart._id}`}>
                <button class="bg-[#3ea7ac] hover:bg-[#278a9e] text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center w-full mt-2">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
