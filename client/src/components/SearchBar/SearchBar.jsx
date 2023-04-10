import "./SearchBar.css";
import { UilSearch } from "@iconscout/react-unicons";

export default function SearchBar() {
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="I'm looking for..."
        style={{
          outline: "none",
        }}
      />
      <div className="s-icon">
        <UilSearch />
      </div>
    </div>
  );
}
