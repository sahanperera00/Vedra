import "./Card1.css";

export default function Card1({ item }) {
  return (
    <div className="card1">
      <div></div>
      <div className="textcont">
        <h4>{item.name}</h4>
        <p>{item.price}</p>
      </div>
    </div>
  );
}
