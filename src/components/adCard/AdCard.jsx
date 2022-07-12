import { Link } from "react-router-dom";
import "./adcard.css";

export default function AdCard({ card }) {

  const navigate_show = {
    car_sales: "200",
    car_rent: "201",
    property_sales: "202",
    property_rent: "203",
    mobile: "204",
    access: "205",
    midical: "206",
    electron: "207",
    furniture: "208",
  }

  return (
    <div className="ad">
      <Link to={{
        pathname: navigate_show[card.type],
        state: {ad_id: card.id},
      }}>
        <img src={card.img} alt="ad" />
        <div className="text fs-1">
          <span>{card.price}</span>
          <span>{card.name}</span>
        </div>
      </Link>
    </div>
  );
}
