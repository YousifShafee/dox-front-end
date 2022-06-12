import "./adcard.css";

export default function AdCard({ card }) {
  return (
    <div className="ad">
      <img src={ card.img } alt="ad" />
      <div className="text fs-1">
        <span>{card.price}</span>
        <span>{card.name}</span>
      </div>
    </div>
  );
}
