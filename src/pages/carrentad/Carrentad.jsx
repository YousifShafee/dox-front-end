import "./carrentad.css";
import { useState } from "react";

// Import components

import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import Chatbot from "../../components/chatbot/Chatbot";
import Dropdown from "../../components/dropdown/Dropdown";
import { Add, adNavigate, CAR_RENT_URL } from "../../config";
import API from "../../API"
import { useLogin } from "../../components/login/useLogin";
import { useHistory } from "react-router-dom";

export default function Page18() {
  const [counter, setCounter] = useState(4096);
  const [img, setImg] = useState(undefined);
  const { isUserLogin, userId } = useLogin()
  const history = useHistory()
  const ad_type = "car_rent"

  const [messages, setMessages] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    var request = new FormData();
    var { ad_name, description, body_type, fuel_type, engine_capacity, rental_period, rental_option, transmission_type, brand, model, price } = document.forms[1];    
    if (!isUserLogin) {
      setMessages("يجب تسجيل الدخول")
      return
    }
    request.append('user', userId)
    request.append('ad_name', ad_name.value)
    request.append('ad_type', ad_type)
    request.append('brand', brand.value)
    request.append('model', model.value)
    request.append('transmission_type', transmission_type.value)
    request.append('price', price.value)
    request.append('engine_capacity', engine_capacity.value)
    request.append('body_type', body_type.value)
    request.append('fuel_type', fuel_type.value)
    request.append('rental_period', rental_period.value)
    request.append('rental_option', rental_option.value)
    request.append('description', description.value)
    request.append('ad_image', img)
    const response = await API.postRequest(CAR_RENT_URL, Add, request)
    if (response.status === 201) {
      history.push(adNavigate({
        type: ad_type,
        product_id: response.data[0]
      }))
    } else if (response.status === 404) {
      setMessages('هذا البريد غير موجود')
    } else if (response.status === 400) {
      setMessages(response.data.data[0])
      // setIsSubmit(true)
    } else {
      setMessages('حدث خطأ أثناء حفظ الإعلان')
    }
  }
  return (
    <>
      <Navbar />
      <div className="ad-adver">
        <div className="container">
          <div className="box">
            <div className="head fs-1">اضف اعلان</div>
            <div className="body">
              <form onSubmit={handleSubmit} className="inputs ">
                {messages}
                <div className="name">
                  <span>اسم الاعلان</span>
                  <input name="ad_name" type="text" />
                </div>
                <div className="type">
                  <span>صنف الاعلان</span>
                  <div className="input position-relative d-flex ">
                    {/* <input type="text" value="سيارات للبيع" /> */}
                    <Dropdown />
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
                <div className="search mt-3 mb-2 reset-inputs">
                  <div className="position-relative btn-icon">
                    <span className="mr-1 fs-1">سيارات للايجار</span>
                    <img src="./assets/imgs/car.png" alt="car" />
                  </div>
                  <div className="inputs d-grid-2">
                    <div className="input position-relative d-flex ">
                      <input type="text" name="model" placeholder="موديل" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" name="brand" placeholder="اختر الفئة" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" name="price" placeholder="السعر" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" name="transmission_type" placeholder="ناقل الحركة" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" name="body_type" placeholder="نوع الهيكل" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" name="engine_capacity" placeholder="المحرك (سى سى )" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" name="rental_option" placeholder="نظام الايجار" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" name="fuel_type" placeholder="نوع الوقود" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex "></div>
                    <div className="input position-relative d-flex ">
                      <input type="text" name="rental_period" placeholder="مدة الايجار" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    
                  </div>
                </div>
                
                <div className="details">
                  <div className="phone-desc">
                  
                    <div className="desc">
                      <span>اوصف اعلانك</span>
                      <div className="textarea">
                        <textarea
                          cols="22"
                          name="description"
                          rows="6"
                          maxLength={4096}
                        ></textarea>
                        <span className="counter">
                          {counter} عدد الأحرف المتبقية
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="add-imgs">
                    <span className="title">أضف صورا لاعلانك</span>
                    <div className="imgs-inputs">
                      <label className="img-box" htmlFor="img1">
                        <input
                          id="img1"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImg(e.target.files[0])}
                          hidden
                        />
                        {img ? (
                          <img
                            src={URL.createObjectURL(img)}
                            alt="img"
                            className="img-obj"
                          />
                        ) : (
                          <img
                            src="./assets/imgs/add_1.png"
                            className="img-icon"
                            alt="icon"
                          />
                        )}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="submit-ad mt-3">
                  <div className="check">
                    <input type="checkbox" name="" />
                    بنشرك للإعلان، أنت توافق على شروط الإستخدام و قواعد النشر
                  </div>
                  <div className="btns my-1">
                    <div className="add-box">
                      <button
                        className="btn btn-add  search-btn"
                        type="submit"
                        style={{ padding: "19px 35px" }}
                      >
                        <span className="fs-1">حفظ التعديلات</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
      <Footer />
    </>
  );
}
