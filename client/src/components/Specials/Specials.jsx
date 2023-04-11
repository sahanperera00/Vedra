import "./Specials.css";
import Carousel from "react-multi-carousel";
import Card1 from "../Card1/Card1";
import { useEffect, useState } from "react";

export default function Specials() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:8081/items/category/NewArrivals"
      );
      const data = await response.json();
      setItems(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="trendingNow">
      <div>
        <h3>Specials</h3>
        <button className="bg-[#3ea7ac] hover:bg-[#278a9e] mx-4 text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          View more
        </button>
      </div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Carousel responsive={responsive}>
            {items.map((item) => (
              <Card1 key={item.id} item={item} />
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
}
