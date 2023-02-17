import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navTopCont">
        <div></div>
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/C.png?alt=media&token=e4428da2-88c5-4e72-92b9-589c18f95334"
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
