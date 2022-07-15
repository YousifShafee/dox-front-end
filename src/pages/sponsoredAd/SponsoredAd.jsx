import "./sponsoredAd.css";
import { useState } from "react";

// Import components

import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import { Add, IMAGE_URL } from "../../config";
import API from "../../API";
import { useLogin } from "../../components/login/useLogin";
import { useHistory } from "react-router-dom";

export default function SponsoredAd() {
  const [messages, setMessages] = useState('');
  const [condition, setCondition] = useState(false);
  const [img, setImg] = useState(null);
  const { isUserLogin, userId } = useLogin()
  const history = useHistory()

  const handleOnChange = () => {
    setCondition(!condition)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    var { ad_category, ad_position, payment_n } = document.forms[1];
    var request = new FormData();
    if (!condition) {
      setMessages("يجب ملئ البيانات المطلوبة")
      return
    }
    let category = ''
    if (ad_position.value === "feature_company") {
      category = "featur_" + ad_category.value
    } else {
      category = ad_category.value
    }
    if (!isUserLogin) {
      setMessages("يجب تسجيل الدخول")
      return
    }
    request.append('user', userId)
    request.append('category', category)
    request.append('payment_n', payment_n.value)
    request.append('images', img)
    const response = await API.postRequest(IMAGE_URL, Add, request)
    if (response.status === 201) {
      history.push("user-account-1")
    } else {
      // setMessages(response.data.data[0])
    }
  }
  return (
    <>
      <Navbar />
      <div className="ad-adver sponsored">
        <div className="container">
          <div className="box">
            <div className="head fs-1">أضف اعلانك الممول</div>
            <div className="body">
              <p className="text-center" style={{ color: "red" }}>{messages}</p>
              <p className="fs-1 text-center mb-4">
                اذا كنت تريد الاشتراك في الإعلانات الممولة فاعلم ان ظهور اعلانك
                سيكون لمدة عام فقط
              </p>
              <form onSubmit={handleSubmit} className="inputs ">
                <div className="type">
                  <span>صنف الإعلان</span>
                  <select name="ad_category" id="categories" className="custom-select fs-1">
                    <option disabled></option>
                    <option value="car">سيارات</option>
                    <option value="property">عقارات</option>
                    <option value="mobile">موبايلات</option>
                    <option value="access">إكسسوارات</option>
                    <option value="midical">مستلزمات طبية</option>
                    <option value="electron">إلكترونيات وأجهزة منزلية</option>
                    <option value="furniture">أثاث منزلي</option>
                  </select>
                  <div className="icons">
                    <img src="./assets/imgs/car.png" alt="icon" />
                    <img src="./assets/imgs/home.png" alt="home" />
                    <img src="./assets/imgs/mobile-phone.png" alt="mobile" />
                    <img src="./assets/imgs/accessory.png" alt="accessory" />
                    <img src="./assets/imgs/diagnosis_1.png" alt="diagnosis_1" />
                    <img src="./assets/imgs/electronics.png" alt="electronics" />
                    <img src="./assets/imgs/furniture.png" alt="furniture" />
                  </div>
                </div>
                <div className="details">
                  <div className="phone-desc">
                    <div className="phone">
                      <span>موقع الإعلان</span>
                      <select name="ad_position" id="categories" className="custom-select fs-1">
                        <option disabled></option>
                        <option value="main-view">العرض الرئيسي</option>
                        <option value="feature_company">شركات مميزة</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="name" >
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
                      <input type="text" name="payment_n" className="mr-c" style={{ width: "20rem", marginRight: "0rem" }} />
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
                    <input type="checkbox" name="accept_condition" onChange={handleOnChange} />
                    بنشرك للإعلان، أنت توافق على شروط الإستخدام و قواعد النشر
                  </div>
                  <div className="btns my-1">
                    <div className="add-box">
                      <button type="submit" className="btn btn-add  search-btn">
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
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
