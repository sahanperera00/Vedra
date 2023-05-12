import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default function ShoppingCart() {
  const [cart, setCart] = useState({});
  const navigate = useNavigate();
  const countRefs = useRef([]);
  const [state, setState] = useState(false);

  //quantity updation (minus or plus)

  //decrease quantity
  const minusCount = async (index, itemID) => {
    if (cart.items[index].quantity > 1) {
      const updatedCart = { ...cart };
      updatedCart.items[index].quantity -= 1;
      setCart(updatedCart);

      await axios
        .put(`http://localhost:8070/orders/${cart._id}/${itemID}`, {
          //update quantity
          quantity: updatedCart.items[index].quantity,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  //increase quantity
  const addCount = async (index, itemID) => {
    const updatedCart = { ...cart };
    updatedCart.items[index].quantity += 1;
    setCart(updatedCart);

    await axios
      .put(`http://localhost:8070/orders/${cart._id}/${itemID}`, {
        //update quantity
        quantity: updatedCart.items[index].quantity,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); //get token from local storage
    if (token) {
      const decodedToken = jwtDecode(token); //decode token

      if (decodedToken.role === "buyer" || decodedToken.role === "admin") {
        // check role
        async function fetchCart() {
          //get cart
          const email = localStorage.getItem("email");
          const status = "cart";
          const response = await fetch(
            //get cart
            `http://localhost:8070/orders/${email}/${status}`
          );
          const data = await response.json();
          setCart(data.order[0]);
          console.log(data.order[0]);
        }
        //call fetchCart function
        fetchCart();
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [state]);

  return (
    <div className="Shoppingcart">
      <Navbar />
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="flex flex-row">
          <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
        </div>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base px-[100px]">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-[#278a9e] text-xs font-semibold text-white ring ring-[#278a9e] ring-offset-2"
                  href="#"
                >
                  1
                </a>
                <span className="font-semibold text-gray-900">Cart</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                okelinecap="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <Link
                  to={`/checkout/${cart._id}`}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                >
                  2
                </Link>
                <span className="font-semibold text-gray-900">Checkout</span>
              </li>
            </ul>
          </div>
        </div>
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
                {cart &&
                  cart.items &&
                  cart.items.map((item, index) => (
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
                              <p
                                className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
                                onClick={async (e) => {
                                  await axios
                                    .post(
                                      //remove item from cart
                                      `http://localhost:8083/orders/${cart._id}/removeItem`,
                                      item
                                    )
                                    .then((res) => {
                                      setState(!state);
                                    });
                                }}
                              >
                                Remove
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="h-full">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => {
                                //decrease quantity
                                minusCount(index, item.itemID);
                              }}
                              className="focus:outline-none cursor-pointer w-7 h-7 flex items-center justify-center bg-[#3ea7ac] text-white hover:bg-[#278a9e] rounded-l-lg"
                            >
                              -
                            </button>
                            <input
                              id="counter"
                              aria-label="input"
                              className="border border-gray-300 h-full text-center w-14 mx-2"
                              type="number"
                              ref={(ref) => (countRefs.current[index] = ref)}
                              value={item.quantity}
                              min={1}
                              readOnly
                            />
                            <button
                              onClick={() => {
                                //add item to cart
                                addCount(index, item.itemID);
                              }}
                              className="focus:outline-none cursor-pointer w-7 h-7 flex items-center justify-center bg-[#3ea7ac] text-white hover:bg-[#278a9e] rounded-r-lg"
                            >
                              +
                            </button>
                          </div>
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
            {cart &&
              cart.items &&
              cart.items.map((item) => (
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
                  {cart &&
                    cart.items &&
                    cart.items
                      .reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                </span>
              </div>

              <Link to={`/checkout/${cart._id}`}>
                <button className="bg-[#3ea7ac] hover:bg-[#278a9e] text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center w-full mt-2">
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
