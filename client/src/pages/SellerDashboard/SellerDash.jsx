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

import { GiMoneyStack, GiConfirmed } from "react-icons/gi";
import { MdPendingActions } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { TbTruckDelivery } from "react-icons/tb";
import SellerSidebar from "../../components/Tailwind/components/SellerSidebar.jsx";
import jwtDecode from "jwt-decode";
import PaymentChart from "../../components/PaymentChart/PaymentChart.jsx";


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

  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  let fTotal = 0;


  const getOrders = async () => {
    await axios
      .get(`http://localhost:8070/orders/`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [Totals,setTotals] = useState(0);
  const calcTotal = ()=>{
    orders.map((order)=>{
      if(order.status === "Dispatched" || order.status === "Confirmed" || order.status === "Pending" || order.status === "Refunded"){
        if(order.status === "Refunded"){
          fTotal -= order.total * 2
        }
        fTotal += order.total
        setTotals(fTotal);
      }
    })
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    currencyDisplay: 'symbol'
  })

  const [dispatched,setDispatched] = useState(0);
  const [confirmed,setConfirmed] = useState(0);
  const [pending,setPending] = useState(0);
  const [refunded,setRefunded] = useState(0);

  const getOrderCount = ()=>{

      let pendingCount = 0;
      let dispatchedCount = 0;
      let confirmedCount = 0;
      let refundedCount = 0;

    orders.map((order)=>{
      if(order.status === "Pending"){
        pendingCount++;
      }
      if(order.status === "Dispatched"){
        dispatchedCount++;
      }
      if(order.status === "Confirmed"){
        confirmedCount++;
      }
      if(order.status === "Refunded"){
        refundedCount++;
      }
      setDispatched(dispatchedCount);
      setConfirmed(confirmedCount);
      setPending(pendingCount);
      setRefunded(refundedCount);

    })
  }

  //algorithm to get the total of all
  const getTotal = async () => {
    let value = 0;
    for (let i = 0; i < orders.length; i++) {
      if(orders[i].status === "Dispatched" || orders[i].status === "Confirmed" || orders[i].status === "Pending" || orders[i].status === "Refunded"){
        if(orders[i].status === "Refunded"){
          value -= orders[i].total * 2
        }
        value = value + orders[i].total;
      }
      
    }

    console.log("Total: ", value);
    setTotal(value);
  };

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode"); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
    getOrders();
  }, []);

  useEffect(() => {
    console.log("Orders: ", orders);
    getTotal();
  }, [getOrders]);

  useEffect(()=>{
    calcTotal();
  },[getOrders])

  useEffect(()=>{
    getOrderCount();
  },[getOrders])

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
                <div className="mt-5" id="tableContainer">
                  <div className="flex flex-wrap lg:flex-nowrap justify-left ml-5 mt-5">
                    <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                      {/* // ADD Chart */}
                      <div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4">
                        <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2 dark:bg-gray-700 w-800">
                          <div class="flex items-center justify-between mb-4">
                            <div class="flex-shrink-0">
                              <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900 dark:text-gray-200">
                                $ {total.toFixed(2)}
                              </span>
                              <h3 class="text-base font-normal text-gray-500 mb-12 dark:text-white">
                                Total Sales
                              </h3>

                              <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900 dark:text-gray-200">
                                $ {(total * 0.15).toFixed(2)}
                              </span>
                              <h3 class="text-base font-normal text-gray-500 dark:text-gray-200">
                                Total Commission to be paid
                              </h3>
                            </div>
                            <div class="flex items-center justify-end flex-1 text-green-500 text-base font-bold ">
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
                        <PaymentChart orders={orders} />
                      </div>
                    </div>
                  </div>
                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-gray-700 dark:text-white ">
                    <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5"></div>

                    <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                      <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                        {/* small top boxes in the dashboard */}{" "}
                        {/* use minimum 3, maximum 5 */}
                        <Link to="/pending">
                          <DashTopBox
                            icon={<MdPendingActions />}
                            label="Orders pending"
                            data={pending}
                          />
                        </Link>
                        <Link to="/confirmed">
                          <DashTopBox
                            icon={<GiConfirmed />}
                            label="Orders confirmed"
                            data={confirmed}
                          />
                        </Link>
                        <Link to="/dispatched">
                          <DashTopBox
                            icon={<TbTruckDelivery />}
                            label="Orders dispatched"
                            data={dispatched}
                          />
                        </Link>
                        <Link to="/refunded">
                          <DashTopBox
                            icon={<TbTruckDelivery />}
                            label="Orders Refunded"
                            data={refunded}
                          />
                        </Link>
                      </div>
                    </div>

                    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                      <AdminPieChart
                        dispatched={dispatched}
                        refunded={refunded}
                        confirmed={confirmed}
                        pending={pending}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDash;
