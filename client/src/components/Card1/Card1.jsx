import "./Card1.css";
import TextTruncate from "react-text-truncate";
import { Rating } from "react-simple-star-rating";

export default function Card1({ item }) {
  return (
    <div className="card1">
      <div>
        <img src={item.img} alt="" />
      </div>
      <div className="textcont">
        <TextTruncate
          line={3}
          element="span"
          truncateText="…"
          text={item.name}
          // textTruncateChild={<a href="#">Read on</a>}
        />
        <div>
          <p>{item.price}</p>
          <Rating size={20} initialValue={item.star} />
          {/* <p>{item.star}</p> */}
        </div>
      </div>
    </div>
  );
}
