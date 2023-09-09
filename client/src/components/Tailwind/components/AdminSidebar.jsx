import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel,MdPendingActions } from 'react-icons/md';
import {TbTruckDelivery,TbBrandGoogleAnalytics} from 'react-icons/tb';
import { GiConfirmed } from 'react-icons/gi';
import { AiOutlineHome } from 'react-icons/ai';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { useStateContext } from '../../../../src/contexts/ContextProvider';

const AdminSidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 transition duration-300 ease-in-out';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <img
                className="logo"
                style={{ marginLeft: "40px" }}
                src="https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/homepage%2Flogo-white-removebg-preview.png?alt=media&token=07c66137-9a8a-473d-b6af-20b46dff3e9c"
                alt=""
              />
            </Link>

            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          <div className="mt-10 ">
            {/*  menu ---------------------------------------------------------------------------------- menu  */}

            {/*  links ---------------------------------------------------------------------------------- links  */}
            <NavLink
              to="/admin"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <AiOutlineHome /> {/*  icon  */}
              <span className="capitalize ">Dashboard</span> {/*  link name  */}
            </NavLink>

            <NavLink
              to="/comingSoon"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <TbBrandGoogleAnalytics /> {/*  icon  */}
              <span className="capitalize ">Analytics</span> {/*  link name  */}
            </NavLink>

            <NavLink
              to="/pending"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdPendingActions /> {/*  icon  */}
              <span className="capitalize ">Pending orders</span>{" "}
              {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/confirmed"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <GiConfirmed /> {/*  icon  */}
              <span className="capitalize ">Confirmed orders</span>{" "}
              {/*  link name  */}
            </NavLink>

            <NavLink
              to="/dispatched"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <TbTruckDelivery /> {/*  icon  */}
              <span className="capitalize ">Orders dispatched</span>{" "}
              {/*  link name  */}
            </NavLink>

            <NavLink
              to="/refunded"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdPendingActions /> {/*  icon  */}
              <span className="capitalize ">Returned orders</span>{" "}
              {/*  link name  */}
            </NavLink>

            <NavLink
              to="https://dashboard.stripe.com/test/payments"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <TbBrandGoogleAnalytics /> {/*  icon  */}
              <span className="capitalize ">Payment Analytics</span>{" "}
              {/*  link name  */}
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminSidebar;
