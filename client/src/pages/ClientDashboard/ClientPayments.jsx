import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider.js";
import TableData from "../../components/Tailwind/components/Table/TableData.jsx";
import TableHeader from "../../components/Tailwind/components/Table/TableHeader.jsx";
import { FiSettings } from "react-icons/fi";
//importing axios 
import axios from "axios";
import { jsPDF } from "jspdf";



import {
  Header,
  Navbar,
  Footer,
  ThemeSettings,
} from "../../components/Tailwind/components";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import ClientSidebar from "../../components/Tailwind/components/ClientSidebar";


/* IMPORT ALL YOUR IMPORTS AS USUAL ABOVE HERE, REMOVE UNNECESSARY ONES*/

const ClientPayments = () => {
  
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
    const currentThemeColor = localStorage.getItem("colorMode"); // KEEP THESE LINES
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const [payment, setPayment] = useState([]);
  const getPayment = async () => {


    const clientMail = localStorage.getItem('email');
    axios.get(`http://localhost:8070/payment/${clientMail}`).then((res) => {
      setPayment(res.data);
    })
  }

  useEffect(() => {
    getPayment();
    console.log(payment);
  }, [])

  //Using a formatter
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    currencyDisplay: 'symbol'
  })

  const createPDF = () => {
    const date = new Date(Date.now()).toISOString().split("T")[0];
    const pdf = new jsPDF("landscape", "px", "a1", false);
    const data = document.querySelector("#tableContainer");
    pdf.html(data).then(() => {
      pdf.save("CostedProductionOrders-" + date + ".pdf");
    });
  };

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
            <div className="w-0 dark:bg-secondary-dark-bg">
              <ClientSidebar />
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
                {/* YOUR COMPONENT IMPLEMENTATION GOES HERE */}
                {/* COPY YOUR ORIGINAL COMPONENT CODE HERE */}
                {/* PART AFTER THE RETURN STATEMENT */}
                <div>
                  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white">
                    <Header title="Confirmed Orders " />

                    <div className=" flex items-center mb-5 "></div>
                    <div className="block w-full overflow-x-auto rounded-lg">
                      <table className="w-full rounded-lg">
                        <thead>
                          <tr className="bg-slate-200 text-md h-12 dark:bg-slate-800">
                            <TableHeader value="Invoice No" />
                            <TableHeader value="Order ID" />
                            <TableHeader value="Payment Date" />
                            <TableHeader value="Net Price" />
                            <TableHeader value="Transaction Type" />
                            <TableHeader value="Status" />
                          </tr>
                        </thead>
                        <tbody>
                          {payment.map((data, key) => {

                            let dataColor = 'text-black dark:text-white';
                            let type = "Payment"
                            
                            if(data.netPrice > 0){
                              dataColor = 'text-green-500 font-bold'
                              type = 'Payment'
                            }else{
                              dataColor = 'text-red-500 font-bold'
                              type = 'Refund'
                            }
                            return (
                                <tr className="text-sm h-10 border dark:border-slate-600">
                                  <TableData value={`INV` + data._id} />
                                  <TableData value={data._id} />
                                  <TableData value={new Date(data.pmtDate).toISOString().split('T')[0]} />
                                  <TableData value={formatter.format(data.netPrice)} />
                                  <td className={`${dataColor} text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3`}> {type} </td>

                                  <td className="text-center px-3 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-3">
                                    <Link to={`/payment/${data._id}`}>
                                      <button
                                        type="button"
                                        className="font-bold py-1 px-4 rounded-full mx-3 text-white"
                                        style={{ background: currentColor }}
                                      > View Payment Details
                                        <i className="fas fa-edit" />
                                      </button>
                                    </Link>
                                  </td>
                                </tr>
                            )
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

export default ClientPayments;
