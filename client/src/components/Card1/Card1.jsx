import "./Card1.css";
import TextTruncate from "react-text-truncate";

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
        <p>{item.price}</p>
      </div>
    </div>
  );
}
