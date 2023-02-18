import "./Card1.css";
import TextTruncate from "react-text-truncate";
import { Rating } from "react-simple-star-rating";
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
          <Rating size={20} initialValue={item.star} />
          {/* <p>{item.star}</p> */}
        </div>
      </div>
    </div>
  );
}
