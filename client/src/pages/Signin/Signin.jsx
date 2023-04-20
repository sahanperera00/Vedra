import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtdecode from "jwt-decode";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:8084/login", user);
      const { token } = response.data;
      localStorage.setItem("token", token);
      alert("Login Successfull");
      const decoded = jwtdecode(token);
      if (decoded.role === "seller") {
        localStorage.setItem("sellerId", decoded._id);
        localStorage.setItem("email", decoded.email);
        navigate("/seller");
      } else if (decoded.role === "buyer") {
        localStorage.setItem("email", decoded.email);
        navigate("/");
      } else {
        navigate("/admin");
      }
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="signin">
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              class="w-40"
              src="https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/C.png?alt=media&token=e4428da2-88c5-4e72-92b9-589c18f95334"
              alt="logo"
            />
          </a>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required="required"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required="required"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <br />

                <button class="w-full text-white bg-sky-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Sign in
                </button>

                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
