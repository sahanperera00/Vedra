import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Product.css";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

export default function Product() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [imagePreview, setImagePreview] = useState(
    item.image && item.image.length > 0 && item.image[0]
  );

  const avgStar =
    item.star && item.star.reviewers && item.star.reviewers.length > 0
      ? item.star.total / item.star.reviewers.length
      : 0;

  const minusCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addCount = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8081/items/${id}`);
      const data = await response.json();
      setItem(data);
      setIsLoading(false);
    }
    fetchData();
  }, [id]);

  return (
    <>
      <Navbar />
      <div
        className="product"
        style={{
          paddingBottom: "80px",
        }}
      >
        <div className="2xl:container 2xl:mx-auto lg:py-auto lg:px-20 md:py-12 md:px-6 px-4">
          <div className="flex justify-center items-center lg:flex-row flex-col gap-9">
            <div className="  w-full sm:w-96 md:w-8/12 lg:w-7/12 items-center">
              <p className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">
                Home / {"<<Category>>"}
              </p>
              <h2
                className="font-semibold lg:text-4xl text-3xl mt-4"
                style={{
                  lineHeight: "3.5rem",
                  color: "#1a202c",
                }}
              >
                {item.name}
              </h2>

              <div className=" flex flex-row justify-between  mt-5">
                <div className=" flex flex-row space-x-3">
                  <StarRatings
                    starDimension="35px"
                    starSpacing="0px"
                    rating={avgStar}
                    starRatedColor="#feb400"
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
                <p className="focus:outline-none font-normal text-base leading-4 text-gray-700  duration-100 mr-5">
                  {item.star &&
                  item.star.reviewers &&
                  item.star.reviewers.length > 0
                    ? item.star.reviewers.length
                    : 0}{" "}
                  reviews
                </p>
              </div>

              <p className=" font-normal text-base leading-6 text-gray-600 mt-7">
                {item.description}
              </p>
              <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6">
                ${item.price}
              </p>

              <div className="lg:mt-11 mt-10">
                <div
                  className="flex flex-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p
                    className=" font-medium text-base leading-4 text-gray-600"
                    style={{
                      marginRight: "50px",
                    }}
                  >
                    Select quantity
                  </p>
                  <div
                    className="flex"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <button
                      onClick={minusCount}
                      className="focus:outline-none cursor-pointer w-7 h-7 flex items-center justify-center bg-[#3ea7ac] text-white hover:bg-[#278a9e] rounded-l-lg"
                    >
                      -
                    </button>
                    <input
                      id="counter"
                      aria-label="input"
                      className="border border-gray-300 h-full text-center w-14 mx-2"
                      type="text"
                      value={count}
                      disabled
                    />
                    <button
                      onClick={addCount}
                      className="focus:outline-none cursor-pointer w-7 h-7 flex items-center justify-center bg-[#3ea7ac] text-white hover:bg-[#278a9e] rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <Link to="/">
                <button className="bg-[#3ea7ac] hover:bg-[#278a9e] focus:outline-none font-medium text-base rounded-lg leading-4 text-white w-full py-5 lg:mt-12 mt-6">
                  Add to Shopping Cart
                </button>
              </Link>
            </div>

            <div
              className=" w-full sm:w-96 md:w-8/12  lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-8"
              style={{
                marginLeft: "50px",
              }}
            >
              <div className=" w-full lg:w-8/12 bg-white flex justify-center items-center">
                <img
                  src={
                    imagePreview
                      ? imagePreview
                      : item.image && item.image.length > 0 && item.image[0]
                  }
                  alt="Wooden Chair Previw"
                />
              </div>
              <div className=" w-full lg:w-4/12 grid lg:grid-cols-1 sm:grid-cols-4 grid-cols-2 gap-6">
                <div className="bg-white flex justify-center items-center py-4">
                  <img
                    src={item.image && item.image.length > 0 && item.image[0]}
                    alt="Wooden chair - preview 1"
                    onClick={() => {
                      setImagePreview(item.image[0]);
                    }}
                  />
                </div>
                <div className="bg-white flex justify-center items-center py-4">
                  <img
                    src={item.image && item.image.length > 0 && item.image[1]}
                    alt="Wooden chair - preview 2"
                    onClick={() => {
                      setImagePreview(item.image[1]);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
