import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navTopCont">
        <div></div>
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/ayurvita-b6e56.appspot.com/o/ayurvitalogoB%26W.png?alt=media&token=92fc7480-6b1a-4a03-9be3-9ca5d3cfe542"
            alt=""
          />
        </div>
        <div>
          <SearchBar />
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
