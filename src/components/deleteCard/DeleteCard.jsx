import { IMAGE_URL } from "../../config";
import API from "../../API";
import "./deleteCard.css";

export default function DeleteCard({ img, img_id }) {
  const deleteImage = async () => {
    await API.deleteRequest(IMAGE_URL, img_id)
  }
  
  return (
    <div className="delete-card">
      <img
        className="delete-card-img"
        src={img}
        alt="img cart"
      />
      <button onClick={deleteImage} className="btn fs-1">
        حذف
        <img src="./assets/imgs/delete.png" alt="delete icon" />
      </button>
    </div>
  );
}
