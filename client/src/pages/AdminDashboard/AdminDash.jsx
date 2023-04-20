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

/* IMPORT ALL YOUR IMPORTS AS USUAL ABOVE HERE, REMOVE UNNECESSARY ONES*/

const AdminDash = () => {
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

  /* 
  ------------------------------------------------
  YOUR AXIOS CALLS AND USE STATES GOES  ABOVE HERE 
  ------------------------------------------------
  */

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role === "buyer" || decodedToken.role === "admin") {
        navigate("/");
      }
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
                        label="Average Sales Amount"
                        data={200000 + "LKR"}
                      />
                      <DashTopBox
                        icon={<GiMoneyStack />}
                        label="Total Revenue Amount"
                        data={2000000 + "LKR"}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                    <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                      {/* small top boxes in the dashboard */}{" "}
                      {/* use minimum 3, maximum 5 */}
                      <Link to="/MaintenanceViewAll">
                        <DashTopBox
                          icon={<MdPendingActions />}
                          label="Orders pending"
                          data={23}
                        />
                      </Link>
                      <Link to="/MachMaintenanceViewAll">
                        <DashTopBox
                          icon={<GiConfirmed />}
                          label="Orders confirmed"
                          data={40}
                        />
                      </Link>
                      <Link to="/VehiMaintenanceViewAll">
                        <DashTopBox
                          icon={<TbTruckDelivery />}
                          label="Orders dispatched"
                          data={85}
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
                    <AdminPieChart />
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
