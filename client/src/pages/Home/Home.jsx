import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AdvetisementCarousel from "../../components/AdvetisementCarousel/AdvetisementCarousel";
import TrendingNow from "../../components/TrendingNow/TrendingNow";
import NewArrivals from "../../components/NewArrivals/NewArrivals";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <AdvetisementCarousel />
      <TrendingNow />
      <NewArrivals />
      <Footer />
    </div>
  );
}
