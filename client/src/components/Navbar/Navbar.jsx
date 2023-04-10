import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { UilShoppingBag } from "@iconscout/react-unicons";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navTopCont">
        <div>
          <Link to={"/"}>
            <img
              className="logo"
              src="https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/C.png?alt=media&token=e4428da2-88c5-4e72-92b9-589c18f95334"
              alt=""
            />
          </Link>
        </div>
        <div>
          <SearchBar />
        </div>
        <div>
          <Link to={"/signin"}>
            <button
              type="button"
              className="bg-[#3ea7ac] mx-4 text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
          </Link>
          <Link to={"/cart"}>
            <UilShoppingBag className="cartIcon" />
          </Link>
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
