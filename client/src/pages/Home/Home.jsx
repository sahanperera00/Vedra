import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AdvetisementCarousel from "../../components/AdvetisementCarousel/AdvetisementCarousel";
import TrendingNow from "../../components/TrendingNow/TrendingNow";
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import Specials from "../../components/Specials/Specials";
import BestSellers from "../../components/BestSellers/BestSellers";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  useEffect(() => {
    const getOrder = async () => {
      const res = await axios.get(
        `http://localhost:8070/orders/${localStorage.getItem("email")}/cart` //get order
      );
      if (!res.data.isSuccess) {
        const newOrder = {
          email: localStorage.getItem("email"),
          items: [],
          total: 0,
          status: "cart",
          address: "",
          shippingMethod: "",
        };
        await axios.post("http://localhost:8070/orders", newOrder); //create order
      }
    };
    getOrder();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <AdvetisementCarousel />
      <TrendingNow />
      <NewArrivals />
      <Specials />
      <BestSellers />
      <Footer />
    </div>
  );
}
