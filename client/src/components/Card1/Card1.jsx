import "./Card1.css";
import TextTruncate from "react-text-truncate";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

export default function Card1({ item }) {
  const avgStar =
    item.star && item.star.reviewers && item.star.reviewers.length > 0
      ? item.star.total / item.star.reviewers.length
      : 0;
  return (
    <div className="card1">
      <div>
        <img
          src={item.image && item.image.length > 0 && item.image[0]}
          alt=""
        />
      </div>
      <div className="textcont">
        <Link to={`/pr/${item._id}`}>
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
          <p>${item.price}</p>
          <div>
            <StarRatings
              starDimension="20px"
              starSpacing="0px"
              rating={avgStar}
              starRatedColor="#feb400"
              // changeRating={() => {}}
              numberOfStars={5}
              name="rating"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
