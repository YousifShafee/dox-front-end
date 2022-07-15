import { Link, useHistory } from "react-router-dom";
import { adNavigate } from "../../config";
import "./adcard.css";

export default function AdCard({ card }) {
  const history = useHistory()
  const handleSubmit = () => {
    history.push(adNavigate(card))
  }
  return (
    <div onClick={handleSubmit} className="ad">
      <img src={card.img} alt="ad" />
      <div className="text fs-1">
        <span>{card.price}</span>
        <span>{card.name}</span>
      </div>
    </div>
  );
}
