import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {FiUser,FiShoppingBag,
} from 'react-icons/fi';

import {SiMarketo} from "react-icons/si";
import { HiUserGroup } from 'react-icons/hi';
import {TbReportMoney,TbBuildingFactory2, TbFileInvoice} from 'react-icons/tb';
import {BiDiamond} from 'react-icons/bi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';

import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { useStateContext } from '../../../../src/contexts/ContextProvider';

const ClientSidebar = () => {
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
    <div className="ml-0 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
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

          <div className="mt-10">
            <NavLink
              to="/client"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiUser /> {/*  icon  */}
              <span className="capitalize">My Dashboard</span>{" "}
              {/*  link name  */}
            </NavLink>

            <NavLink
              to="/"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <SiMarketo /> {/*  icon  */}
              <span className="capitalize ">Marketplace</span>{" "}
              {/*  link name  */}
            </NavLink>

            <NavLink
              to="/comingSoon"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <TbReportMoney /> {/*  icon  */}
              <span className="capitalize ">My Wishlist</span>{" "}
              {/*  link name  */}
            </NavLink>

            <NavLink
              to="/orders"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiShoppingBag /> {/*  icon  */}
              <span className="capitalize ">My Orders</span> {/*  link name  */}
            </NavLink>

            <NavLink
              to="/cart"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <AiOutlineShoppingCart /> {/*  icon  */}
              <span className="capitalize ">My Cart</span> {/*  link name  */}
            </NavLink>

            <NavLink
              to="/mypayments"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <TbReportMoney />
              {/*  icon  */}
              <span className="capitalize ">My Payments</span>{" "}
              {/*  link name  */}
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientSidebar;
