import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

export default function Checkout() {

  const product1 = {
    name: "Nike Air Max Pro - Super Light",
    size: "42EU - 8.5US",
    price: 138.99
  }
  const product2 = {
    name: "Adidas Parley Hi Rez - Super Light",
    size: "42EU - 8.5US",
    price: 130.99
  }
  
  return (
    <div>
      <Navbar />
      <div class="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" class="text-2xl font-bold text-gray-800">
          Checkout
        </a>
        <div class="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base px-[100px]">
          <div class="relative">
            <ul class="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li class="flex items-center space-x-3 text-left sm:space-x-4">
                <Link
                  to="/cart"
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                >
                  1
                </Link>
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
                  to="/checkout"
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-[#278a9e] text-xs font-semibold text-white ring ring-[#278a9e] ring-offset-2"
                >
                  2
                </Link>
                <span class="font-semibold text-gray-900">Checkout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="grid sm:px-10 lg:px-20 xl:px-32 mb-[100px]">
        <div class="px-4 pt-8">
          <p class="text-2xl font-bold">Order Summary</p>
          <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <div class="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div class="flex w-full flex-col px-4 py-4">
                <span class="font-semibold">
                  Nike Air Max Pro 8888 - Super Light
                </span>
                <span class="float-right text-gray-400">42EU - 8.5US</span>
                <p class="text-lg font-bold">$138.99</p>
              </div>
            </div>
            <div class="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div class="flex w-full flex-col px-4 py-4">
                <span class="font-semibold">
                  {product2.name}
                </span>
                <span class="float-right text-gray-400">{product2.size}</span>
                <p class="mt-auto text-lg font-bold">{`$${product2.price}`}</p>
              </div>
            </div>
          </div>

          <p class="mt-8 text-2xl font-bold">Shipping Methods</p>
          <form class="mt-5 grid gap-6">
            <div class="relative">
              <input
                class="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked
              />

              <span class="peer-checked:border-[#278a9e] absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                class="peer-checked:border-2 peer-checked:border-[#278a9e] peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_1"
              >
                <img
                  class="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div class="ml-5">
                  <span class="mt-2 font-semibold">Fedex Delivery</span>
                  <p class="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            <div class="relative">
              <input
                class="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
              <span class="peer-checked:border-[#278a9e] absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                class="peer-checked:border-2 peer-checked:border-[#278a9e] peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_2"
              >
                <img
                  class="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div class="ml-5">
                  <span class="mt-2 font-semibold">Fedex Delivery</span>
                  <p class="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p class="text-2xl font-bold">Payment Details</p>
          <div class="">
            <div class="mt-6 border-t border-b py-2">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Subtotal</p>
                <p class="font-semibold text-gray-900">$399.00</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Shipping</p>
                <p class="font-semibold text-gray-900">$8.00</p>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Total</p>
              <p class="text-2xl font-semibold text-gray-900">$408.00</p>
            </div>
          </div>
          <div className="justify-center text-right">
            <Link to="/">
              <button className="bg-[#3ea7ac] hover:bg-[#278a9e] text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center mt-7">
                Place Order
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
