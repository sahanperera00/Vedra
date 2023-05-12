//PageTemplate

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TbTruckDelivery } from "react-icons/tb";
import { GiMoneyStack, GiConfirmed } from "react-icons/gi";
import { MdPendingActions } from "react-icons/md";
import { useStateContext } from "../../contexts/ContextProvider.js";
import {
  DashTopBox,
  DashTopButton,
} from "../../components/Tailwind/components";
import { FiSettings } from "react-icons/fi";
import {
  Navbar,
  Footer,
  AdminSidebar,
  ThemeSettings,
  AdminPieChart,
} from "../../components/Tailwind/components";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AdminDash = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

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

  const [orders, setOrders] = useState([]);
  let total = 0;
  const [Totals, setTotals] = useState(0);
  const getOrders = async () => {
    await axios
      .get(`http://localhost:8070/orders/`)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
        console.log(orders);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Takes refunded and removes
  const calcTotal = () => {
    orders.map((order) => {
      if (
        order.status === "Dispatched" ||
        order.status === "Confirmed" ||
        order.status === "Pending" ||
        order.status === "Refunded"
      ) {
        if (order.status === "Refunded") {
          total -= order.total * 2;
        }
        total += order.total;
        setTotals(total);
      }
    });
  };

  //Order count states
  const [dispatched, setDispatched] = useState(0);
  const [confirmed, setConfirmed] = useState(0);
  const [pending, setPending] = useState(0);
  const [refunded, setRefunded] = useState(0);

  //Get order count
  const getOrderCount = () => {
    let pendingCount = 0;
    let dispatchedCount = 0;
    let confirmedCount = 0;
    let refundedCount = 0;

    orders.map((order) => {
      if (order.status === "Pending") {
        pendingCount++;
      }
      if (order.status === "Dispatched") {
        dispatchedCount++;
      }
      if (order.status === "Confirmed") {
        confirmedCount++;
      }
      if (order.status === "Refunded") {
        refundedCount++;
      }
      setDispatched(dispatchedCount);
      setConfirmed(confirmedCount);
      setPending(pendingCount);
      setRefunded(refundedCount);
    });
  };

  //Get orders on load

  useEffect(() => {
    getOrders();
  }, []);

  //Get totals on load

  useEffect(() => {
    calcTotal();
  }, [getOrders]);

  //Get order count on load
  useEffect(() => {
    getOrderCount();
  }, [getOrders]);

  //Cost formatter

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
              <AdminSidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <AdminSidebar />
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
                      {/* top buttons in the dashboard */}{" "}
                      {/* use for navigation buttons*/}
                      {/* <Link to="/MaintenanceViewAll">
                                <DashTopButton value="Property Maintenance" icon={<BiBuildingHouse />} />
                                </Link>
                                
                                <Link to="/MachMaintenanceViewAll">
                                <DashTopButton value="Machinery Maintenance" icon={<GiSewingMachine />} />
                                </Link>
                               
                                <Link to="/VehiMaintenanceViewAll">
                                <DashTopButton value="Vehicles Maintenance" icon={<MdOutlineDirectionsBusFilled />} />
                                </Link> */}
                    </div>
                  </div>

                  <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                    <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                      {/* small top boxes in the dashboard */}{" "}
                      {/* use minimum 3, maximum 5 */}
                      <DashTopBox
                        icon={<GiMoneyStack />}
                        label="Gross Sales Amount"
                        data={formatter.format(Totals)}
                      />
                      <DashTopBox
                        icon={<GiMoneyStack />}
                        label="Total Commissions Earned"
                        data={formatter.format(Totals * 0.15)}
                      />
                    </div>
                  </div>

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
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
