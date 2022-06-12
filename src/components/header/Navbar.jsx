import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchImage } from "../../API";
import { Logo } from "../../config";
import "./header.css";

export default function Navbar({ user }) {
  const [logo, setLogo] = useState('')

  useEffect(()=>{
    async function fetchLogo(){
      await fetchImage(Logo)
      .then(response => {
        setLogo(response[0])
      })
    }
    fetchLogo()
  }, [])
  return (
    <div className="navbar">
      <div className="container">
        <Link to={"/"} className="logo-box">
          <img src={logo.img} className="logo" alt="logo" />

          <div className="dox">
            D<span className="text-light">o</span>X
          </div>
        </Link>
        {!user && (
          <>
            <div className="btns mx-1-2">
              <div className="add-box">
                <button className="btn btn-add btn-add-custom ">
                  <span className="fs-1">اعلان ممول</span>
                  <img
                    className="add-icon"
                    src="./assets/imgs/add.png"
                    alt="add"
                  />
                </button>
              </div>
            </div>
            <div className="search-input mr-2">
              <input
                type="text"
                placeholder="البحث عن المنتجات"
                className="fs-1"
              />
              <img src="./assets/imgs/search.png" alt="search" />
            </div>
          </>
        )}
        <div className="btns ">
          <div className="add-box">
            <button className="btn btn-add ">
              <span className="fs-1"> اضف اعلان</span>
              <img className="add-icon" src="./assets/imgs/add.png" alt="add" />
            </button>
          </div>
          {user ? (
            <div className="add-box mr-7">
              <button className="btn btn-add btn-auth  text-light  ">
                <span className="fs-1">حسابى</span>
                <img
                  className="add-icon w-22"
                  src="./assets/imgs/person.png"
                  alt="add"
                />
              </button>
            </div>
          ) : (
            <>
              <Link to={"/11"} className="text-light btn btn-auth fs-1">
                انشاء حساب
              </Link>
              <Link to={"/13"} className="text-light btn btn-auth fs-1">
                تسجيل الدخول
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
