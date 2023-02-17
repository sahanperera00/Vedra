import "./TrendingNow.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card1 from "../Card1/Card1";

export default function TrendingNow() {
  const data = [
    {
      id: 1,
      name: "Product Name",
      price: "Price",
      img: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      name: "Product Name",
      price: "Price",
      img: "https://picsum.photos/200/300",
    },

    {
      id: 3,
      name: "Product Name",
      price: "Price",
      img: "https://picsum.photos/200/300",
    },
    {
      id: 4,
      name: "Product Name",
      price: "Price",
      img: "https://picsum.photos/200/300",
    },
    {
      id: 5,
      name: "Product Name",
      price: "Price",
      img: "https://picsum.photos/200/300",
    },
    {
      id: 6,
      name: "Product Name",
      price: "Price",
      img: "https://picsum.photos/200/300",
    },
    {
      id: 7,
      name: "Product Name",
      price: "Price",
      img: "https://picsum.photos/200/300",
    },
    {
      id: 8,
      name: "Product Name",
      price: "Price",
      img: "https://picsum.photos/200/300",
    },
  ];
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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
        <h3>Trending Now</h3>
        <button className="button">View more</button>
      </div>
      <div>
        <Carousel responsive={responsive}>
          {data.map((item) => (
            <Card1 key={item.id} item={item} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
