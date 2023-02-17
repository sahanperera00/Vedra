import "./NewArrivals.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card1 from "../Card1/Card1";

export default function NewArrivals() {
  const data = [
    {
      id: 1,
      name: "California Gold Nutrition, Vitamin D3, 125 mcg (5,000 IU), 90 Fish Gelatin Softgels",
      price: "$6.50",
      img: "https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/item1.jpg?alt=media&token=5e9f2427-b3b0-481b-93e9-284d14212e2b",
    },
    {
      id: 2,
      name: "GAT, Mens Multi + Test, 150 Tablets",
      price: "$16.00",
      img: "https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/item2.jpg?alt=media&token=b21d30d2-009f-4824-aaef-92329cb57386",
    },

    {
      id: 3,
      name: "Swanson, Albion, Magnesium Glycinate, 133 mg, 90 Capsules",
      price: "$7.02",
      img: "https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/item3.jpg?alt=media&token=ecaff422-527c-4d0e-a887-cf0891bbeb2f",
    },
    {
      id: 4,
      name: "Mediheal, V.T.R Stretching patch, 1 Patch",
      price: "$7.96",
      img: "https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/item4.jpg?alt=media&token=d762be1d-5abc-491e-9d0e-7a728c694b03",
    },
    {
      id: 5,
      name: "Swanson, 5-HTP, 200 mg, 60 Capsules",
      price: "$10.84",
      img: "https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/item5.jpg?alt=media&token=b33f13f5-2690-4a8c-bb4f-9b67c5be7522",
    },
    {
      id: 6,
      name: "Pixi Beauty, Flawless Beauty Primer, 1.01 fl oz (30 ml)",
      price: "$20.06",
      img: "https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/item6.jpg?alt=media&token=f201659c-1b63-48a6-baba-c5d3ca4fb0ce",
    },
    {
      id: 7,
      name: "Justin's Nut Butter, Organic Dark Chocolate Almond Butter Cups, 2 Cups, 1.4 oz (40 g)",
      price: "$2.89",
      img: "https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/item7.jpg?alt=media&token=74bef976-63d5-481c-ba1b-1d1bd29a2d2e",
    },
    {
      id: 8,
      name: "Mediheal, E.G.T Essence Gel, Eyefill Patch, 5 Set, (13.5 g)",
      price: "$7.68",
      img: "https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/item8.jpg?alt=media&token=cf3cc567-04f1-4eeb-ab1f-c34faf43f7e9",
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
        <h3>New Arrivals</h3>
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
