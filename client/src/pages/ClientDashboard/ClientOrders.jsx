import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider.js";
import TableData from "../../components/Tailwind/components/Table/TableData.jsx";
import TableHeader from "../../components/Tailwind/components/Table/TableHeader.jsx";
import { FiSettings } from "react-icons/fi";
import {
  Header,
  Navbar,
  Footer,
  ThemeSettings,
} from "../../components/Tailwind/components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import ClientSideBar from "../../components/Tailwind/components/ClientSidebar.jsx";

import axios from "axios";

import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";

/* IMPORT ALL YOUR IMPORTS AS USUAL ABOVE HERE, REMOVE UNNECESSARY ONES*/

const ClientOrders = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    await axios
      .get(
        `http://localhost:8070/orders/email/${localStorage.getItem("email")}`
      )
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode"); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  //status change
  const orderStatus = async (id, stat) => {
    try {
      let status = null;
      if (stat === "Reject") {
        status = "Refunded";
      } else if (stat === "Approve") {
        status = "Dispatched";
      }
      await axios
        .patch(`http://localhost:8083/orders/updateStatus`, { id, status })
        .then((res) => {
          console.log(res.data);
          console.log("order Status Updated");
          if (status == "Dispatched") {
            toast.success("Order Successfully Dispatched!");
          } else {
            toast.warn("Order Rejected!");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  //using the formatter
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    currencyDisplay: "symbol",
  });

  return (
    <div>
      {/* DON'T CHANGE ANYTHING HERE */}

      <div className={currentMode === "Dark" ? "dark" : ""}>
        <ToastContainer />
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
              <ClientSideBar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <ClientSideBar />
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
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg  w-full ">
              <Navbar />
            </div>

            <div>
              {themeSettings && <ThemeSettings />}
              <div>
                {/* YOUR COMPONENT IMPLEMENTATION GOES HERE */}
                {/* COPY YOUR ORIGINAL COMPONENT CODE HERE */}
                {/* PART AFTER THE RETURN STATEMENT */}
                <div>
                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
                    <Header title="Your Orders " />

                    <div className=" flex items-center mb-5 "></div>
                    <div className="block w-full overflow-x-auto rounded-lg">
                      <table className="w-full rounded-lg">
                        <thead>
                          <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                            <TableHeader value="Order ID" />
                            <TableHeader value="Client" />
                            <TableHeader value="Gross Price" />
                            <TableHeader value="Commission" />
                            <TableHeader value="Status" />
                            <TableHeader value="Action" />
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((data) => {
                            if (data.status !== "cart") {
                              let datacolor = "text-black ";
                              if (data.status === "Pending") {
                                datacolor = "text-orange-800 font-bold font-bold dark:text-orange-400";
                              } else if(data.status === "Confirmed") {
                                datacolor = "text-blue-800 font-bold font-bold dark:text-blue-400";
                              } else if(data.status === "Dispatched") {
                                datacolor = "text-green-700 font-bold"
                              } else if(data.status === "Refunded") {
                                datacolor = "text-red-700 font-bold"
                              }
                              return (
                                <tr className="text-sm h-10 border dark:border-slate-600">
                                  <TableData value={data._id} />
                                  <TableData value={data.email} />
                                  <TableData
                                    value={formatter.format(data.total)}
                                  />
                                  <TableData
                                    value={formatter.format(data.total * 0.15)}
                                  />
                                  <td
                                    className={`${datacolor} text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3`}
                                  >
                                    <TableData value={data.status} />
                                  </td>
                                  <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                                    <Link to={`/orders/${data._id}`}>
                                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                                        View Order
                                      </button>
                                    </Link>
                                  </td>
                                </tr>
                              );
                            }
                          })}
                        </tbody>
                      </table>
                      <br></br>
                      <br></br>
                    </div>
                  </div>
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

export default ClientOrders;
