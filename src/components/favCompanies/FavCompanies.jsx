import "./favCompanies.css";

export default function FavCompanies({ imgs }) {
  return (
    <div className="fill-container">
      <div className="title">
        <span className="fs-1 d-block">الشركات المُميزة</span>
      </div>
      <div className="companies">
        {imgs.length > 0 &&
          imgs.map((img, i) => (
            <img src={img.img} alt="fav-company" />
          ))}
      </div>
      <div className="title my-4">
        <span className="fs-1 d-block">الاعلانات</span>
      </div>
    </div>
  );
}
