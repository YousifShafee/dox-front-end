import "./sponsoredAd.css";
import { useState } from "react";

// Import components

import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import Chatbot from "../../components/chatbot/Chatbot";

export default function SponsoredAd() {
  const [img, setImg] = useState(null);

  return (
    <>
      <Navbar user={true} />
      <div className="ad-adver sponsored">
        <div className="container">
          <div className="box">
            <div className="head fs-1">أضف اعلانك الممول</div>
            <div className="body">
              <p className="fs-1 text-center mb-4">
                اذا كنت تريد الاشتراك في الإعلانات الممولة فاعلم ان ظهور اعلانك
                سيكون لمدة عام فقط
              </p>
              <div className="inputs ">
                <div className="type">
                  <span>صنف الاعلان</span>
                  <div className="input position-relative d-flex ">
                    <input type="text" />
                    <img src="./assets/imgs/down-arrow.png" alt="icon" />
                  </div>
                  <div className="icons">
                    <img src="./assets/imgs/car.png" alt="icon" />
                    <img src="./assets/imgs/home.png" alt="home" />
                    <img src="./assets/imgs/mobile-phone.png" alt="mobile" />
                    <img src="./assets/imgs/accessory.png" alt="accessory" />
                    <img
                      src="./assets/imgs/diagnosis_1.png"
                      alt="diagnosis_1"
                      className=""
                    />
                    <img
                      src="./assets/imgs/electronics.png"
                      alt="electronics"
                      className=""
                    />
                    <img
                      src="./assets/imgs/furniture.png"
                      alt="furniture"
                      className=""
                    />
                  </div>
                </div>
                <div className="name">
                  <span>صورة الاعلان</span>
                  <label className="img-box-sponsored" htmlFor="img">
                    <input
                      id="img"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImg(e.target.files[0])}
                      hidden
                    />
                    <img src="./assets/imgs/add-image.png" alt="add_image" />
                    <span className="p-color fs-1">قم بتحميل صورة اعلانك</span>
                  </label>
                  {img && (
                    <img
                      src={URL.createObjectURL(img)}
                      alt="img"
                      className="img-obj-sponsored"
                    />
                  )}
                </div>

                <div className="details">
                  <div className="phone-desc">
                    <div className="phone">
                      <span>رقم عملية الدفع</span>
                      <input type="text" className="mr-c" />
                    </div>
                  </div>
                </div>
                <div className="payment">
                  <div className="btns">
                    <button className="fs-1 f-bold btn-icon mb-0 c-wh">
                      01067764726
                      <img
                        className="add-icon"
                        src="./assets/imgs/phone.png"
                        alt="add"
                      />
                    </button>
                  </div>
                  <span className="fs-1 p-color">
                    طريقة الدفع ستكون عن طريق فودافون كاش على الرقم
                  </span>
                </div>
                <div className="submit-ad mt-3">
                  <div className="check">
                    <input type="checkbox" name="" />
                    بنشرك للإعلان، أنت توافق على شروط الإستخدام و قواعد النشر
                  </div>
                  <div className="btns my-1">
                    <div className="add-box">
                      <button className="btn btn-add  search-btn">
                        <span className="fs-1">أنشر الاعلان</span>
                        <img
                          className="add-icon"
                          src="./assets/imgs/add.png"
                          alt="add"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
      <Footer />
    </>
  );
}
