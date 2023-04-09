import "./Card1.css";
import TextTruncate from "react-text-truncate";
// import { Rating } from "react-simple-star-rating";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

export default function Card1({ item }) {
  return (
    <div className="card1">
      <div>
        <img src={item.img} alt="" />
      </div>
      <div className="textcont">
        <Link to={"/pr/:id"}>
          <div className="prname">
            <TextTruncate
              line={3}
              element="span"
              truncateText="…"
              text={item.name}
            />
          </div>
        </Link>
        <div>
          <p>{item.price}</p>
          <div>
            {/* <Rating size={20} initialValue={item.star} /> */}
            <StarRatings
              starDimension="20px"
              starSpacing="0px"
              rating={item.star}
              starRatedColor="#feb400"
              changeRating={() => {}}
              numberOfStars={5}
              name="rating"
            />
          </div>
          {/* <p>{item.star}</p> */}
        </div>
      </div>
    </div>
  );
}
