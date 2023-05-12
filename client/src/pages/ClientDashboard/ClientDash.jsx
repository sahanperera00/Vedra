import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useStateContext } from "../../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import {
  Navbar,
  Footer,
  ThemeSettings,
} from "../../components/Tailwind/components";
import ClientSidebar from "../../components/Tailwind/components/ClientSidebar";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import jwtDecode from "jwt-decode";
import ClientPayTab from "../../components/ClientPaymentTable/ClientPmtTable";
import ClientOrderTable from "../../components/ClientOrderTable/ClientOrderTable";

const ClientDash = () => {
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
    const currentThemeColor = localStorage.getItem("colorMode"); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role === "seller" || decodedToken.role === "admin") {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getPayment();
    getOrder();
  }, []);

  //Payment information -> Will be passed to the clientPayTab
  const [payment, setPayment] = useState([]);
  const getPayment = async () => {
    const clientMail = localStorage.getItem("email");
    axios.get(`http://localhost:8070/payment/${clientMail}`).then((res) => {
      setPayment(res.data);
      console.log("User Specific Payments: ", res.data);
    });
  };

  //Order information -> will be passed to the clientOrderTable

  const [order, setOrder] = useState([]);
  const getOrder = async () => {
    const clientMail = localStorage.getItem("email");
    axios
      .get(`http://localhost:8070/orders/email/${clientMail}`)
      .then((res) => {
        setOrder(res.data);
        console.log("User Specific Orders: ", res.data);
      });
  };

  //retrieving payment information

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
              <ClientSidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg"></div>
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
                {/* Paste your content Here */}

                <div className="flex flex-wrap lg:flex-nowrap justify-center ml-5 mt-5">
                  <div className="flex m-3 flex-wrap justify-center gap-5 items-center">
                  <div className="">
                    <ClientOrderTable order={order} />
                  </div>
                  <div className="">
                    <ClientPayTab payment={payment} />
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

export default ClientDash;
