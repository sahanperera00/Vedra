import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link, redirect, useNavigate } from "react-router-dom";
import { UilShoppingBag } from "@iconscout/react-unicons";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import decode from "jwt-decode";

export default function Navbar() {
  const [token, setToken] = useState({});
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // handle logout
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decode(token);
      setToken(decodedToken);
    }
  }, [state]);

  return (
    <div className="navbar">
      <div className="navTopCont">
        <div>
          <Link to={"/"}>
            <img
              className="logo"
              src="https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/homepage%2Frunwayx-logo-removebg-preview.png?alt=media&token=edd5bd75-1c8a-44de-97a5-088aaeef82f1"
              alt="logo"
            />
          </Link>
        </div>
        <div className="h-1000">
          <SearchBar />
        </div>
        <div className="flex items-center gap-6">
          <Link to={"/cart"}>
            <UilShoppingBag className="cartIcon" />
          </Link>
          {token.email ? (
            <>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex gap-3">
                    <img
                      className="w-[40px] rounded-full border-[1px] border-slate-400"
                      src="https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/user.png?alt=media&token=6954d498-070a-45e4-89f7-010b06f2a873"
                      alt="profile"
                    />
                    <p className="text-sm font-medium">
                      Hello {token.firstName} {token.lastName}
                      <br />
                      <span className="text-slate-400">
                        {localStorage.getItem("email")}
                      </span>
                    </p>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {token.role == "buyer"
                          ? ({ active }) => (
                              <Link
                                to={"/client"}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Dashboard
                              </Link>
                            )
                          : token.role == "seller"
                          ? ({ active }) => (
                              <Link
                                to={"/seller"}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Dashboard
                              </Link>
                            )
                          : ({ active }) => (
                              <Link
                                to={"/admin"}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Dashboard
                              </Link>
                            )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                            onClick={() => {
                              localStorage.removeItem("token"); //remove token from local storage
                              localStorage.removeItem("sellerId"); //remove sellerId from local storage
                              localStorage.removeItem("email"); //remove email from local storage
                              setToken("");
                              setState(!state);
                              navigate("/");
                            }}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </>
          ) : (
            <Link to={"/signin"}>
              <button
                type="button"
                className="bg-[#3ea7ac] hover:bg-[#278a9e] mx-4 text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
            </Link>
          )}
        </div>
      </div>
      <hr />
      <div className="navBottomCont">
        <ul>
          <li>Trending Now</li>
          <li>New Arrivals</li>
          <li>Specials</li>
          <li>Best Sellers</li>
        </ul>
      </div>
    </div>
  );
}
