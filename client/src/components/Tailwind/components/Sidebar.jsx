import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import {
  FiUser,
  FiCalendar,
  FiBarChart,
  FiUsers,
  FiFileText,
  FiTool,
  FiPackage,
  FiTrendingUp,
  FiShoppingBag,
  FiGift,
} from 'react-icons/fi';
import { GiSewingMachine, GiSteeringWheel } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi';
import { IoBagHandleOutline } from 'react-icons/io5';
import {
  TbBuildingWarehouse,
  TbTruckDelivery,
  TbReportMoney,
  TbBuildingFactory2,
} from 'react-icons/tb';
import { FaHouseDamage, FaRegMoneyBillAlt, FaChartLine } from 'react-icons/fa';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { useStateContext } from '../../../../src/contexts/ContextProvider';

const Sidebar = () => {
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
                className="logo" style={{marginLeft: "40px"}}
                src="https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/C.png?alt=media&token=e4428da2-88c5-4e72-92b9-589c18f95334"
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
              to="/EmployeeDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiUser /> {/*  icon  */}
              <span className="capitalize ">Employees</span> {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/AttendanceAndLeaveDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiCalendar /> {/*  icon  */}
              <span className="capitalize ">Attendace and leaves</span>{' '}
              {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}
            {/*<NavLink
              to="/WelfareDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiGift /> {/*  icon  */}
            {/*} <span className="capitalize ">Welfare</span>{' '}
              {/*  link name  */}
            {/*</NavLink>*/}

            {/*  menu ---------------------------------------------------------------------------------- menu  */}


            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/FinanceDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <TbReportMoney /> {/*  icon  */}
              <span className="capitalize ">Finance Center</span>{' '}
              {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/SalaryDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FaRegMoneyBillAlt /> {/*  icon  */}
              <span className="capitalize ">Salary</span> {/*  link name  */}
            </NavLink>
            {/*  done ---------------------------------------------------------------------------------- done  */}

            {/*  menu ---------------------------------------------------------------------------------- menu  */}


            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/SalesDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FiShoppingBag /> {/*  icon  */}
              <span className="capitalize ">Order Handling</span>{' '}
              {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/CustomerDashboard"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <HiUserGroup />
              {/*  icon  */}
              <span className="capitalize ">Customer Management</span>{' '}
              {/*  link name  */}
            </NavLink>

            {/*  done ---------------------------------------------------------------------------------- done  */}

            {/*  menu ---------------------------------------------------------------------------------- menu  */}

          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
