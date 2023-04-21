import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider.js";
import {
  DashTopBox,
  DashTopButton,
} from "../../components/Tailwind/components";
import { FiSettings } from "react-icons/fi";
import {
  Navbar,
  Footer,
  ThemeSettings,
  AdminPieChart,
} from "../../components/Tailwind/components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import SellerSidebar from "../../components/Tailwind/components/SellerSidebar.jsx";
import jwtDecode from "jwt-decode";

const SellerDash = () => {
  // <== THIS IS THE COMPONENT NAME, CHANGE IT TO YOUR COMPONENT NAME

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role === "buyer" || decodedToken.role === "admin") {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      {/* DON'T CHANGE ANYTHING HERE */}

      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            {" "}
            {/* THEME SETTINGS BUTTON */}
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {activeMenu ? ( // SIDEBAR IMPLEMENTATION
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <SellerSidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <SellerSidebar />
            </div>
          )}

          <div
            className={
              // MAIN BACKGROUND IMPLEMENTATION
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            {/* NAVBAR IMPLEMENTATION */}
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg w-full ">
              <Navbar />
            </div>

            <div>
              {themeSettings && <ThemeSettings />}
              <div>
                <div className="mt-5">
                  <div className="flex flex-wrap lg:flex-nowrap justify-left ml-5 mt-5">
                    <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                      {/* // ADD Chart */}
                      <div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                        <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                          <div class="flex items-center justify-between mb-4">
                            <div class="flex-shrink-0">
                              <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                                $45,385
                              </span>
                              <h3 class="text-base font-normal text-gray-500">
                                Sales this week
                              </h3>
                            </div>
                            <div class="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                              12.5%
                              <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <div id="main-chart"></div>
                        </div>
                        <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                          <div class="mb-4 flex items-center justify-between">
                            <div>
                              <h3 class="text-xl font-bold text-gray-900 mb-2">
                                Latest Transactions
                              </h3>
                              <span class="text-base font-normal text-gray-500">
                                This is a list of latest transactions
                              </span>
                            </div>
                            <div class="flex-shrink-0">
                              <a
                                href="#"
                                class="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
                              >
                                View all
                              </a>
                            </div>
                          </div>
                          <div class="flex flex-col mt-8">
                            <div class="overflow-x-auto rounded-lg">
                              <div class="align-middle inline-block min-w-full">
                                <div class="shadow overflow-hidden sm:rounded-lg">
                                  <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                      <tr>
                                        <th
                                          scope="col"
                                          class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Transaction
                                        </th>
                                        <th
                                          scope="col"
                                          class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Date & Time
                                        </th>
                                        <th
                                          scope="col"
                                          class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Amount
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody class="bg-white">
                                      <tr>
                                        <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                          Payment from{" "}
                                          <span class="font-semibold">
                                            Bonnie Green
                                          </span>
                                        </td>
                                        <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                          Apr 23 ,2021
                                        </td>
                                        <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                          $2300
                                        </td>
                                      </tr>

                                      <tr>
                                        <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                          Payment failed from{" "}
                                          <span class="font-semibold">
                                            #087651
                                          </span>
                                        </td>
                                        <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                          Apr 18 ,2021
                                        </td>
                                        <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                          $234
                                        </td>
                                      </tr>
                                      <tr class="bg-gray-50">
                                        <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                          Payment from{" "}
                                          <span class="font-semibold">
                                            Lana Byrd
                                          </span>
                                        </td>
                                        <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                          Apr 15 ,2021
                                        </td>
                                        <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                          $5000
                                        </td>
                                      </tr>
                                      <tr>
                                        <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                          Payment from{" "}
                                          <span class="font-semibold">
                                            Jese Leos
                                          </span>
                                        </td>
                                        <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                          Apr 15 ,2021
                                        </td>
                                        <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                          $2300
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white "></div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDash;
