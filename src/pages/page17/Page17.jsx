import "./page17.css";
import { useState } from "react";

// Import components

import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import Chatbot from "../../components/chatbot/Chatbot";
import { Add, AD_URL } from "../../config";
import API from "../../API";

export default function Page17() {
  const [counter, setCounter] = useState(4096);
  const [img, setImg] = useState(undefined);

  const [messages, setMessages] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    var { ad_name, email, uname, uphone, ad_type, description } = document.forms[0];
    var request = new FormData();
    request.append('ad_name', ad_name.value)
    request.append('email', email.value)
    request.append('uname', uname.value)
    request.append('uphone', uphone.value)
    request.append('ad_type', ad_type.value)
    request.append('description', description.value)
    request.append('image', img)
    const response = await API.postRequest(AD_URL, Add, request)
    if (response.status === 201) {
      setMessages('تم إنشاء الإعلان بنجاح')
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
      <Navbar user={true} />
      <div className="ad-adver">
        <div className="container">
          <div className="box">
            <div className="head fs-1">أضف اعلان</div>
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
                    <input name="ad_type" type="text" />
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
                <div className="name-email">
                  <div className="email">
                    <span>الايميل</span>
                    <input name="email" type="email" />
                  </div>
                  <div className="name">
                    <span>الاسم</span>
                    <input name="uname" type="text" />
                  </div>
                </div>
                <div className="details">
                  <div className="phone-desc">
                    <div className="phone">
                      <span>رقم الموبيل</span>
                      <input name="uphone" type="text" />
                    </div>
                    <div className="desc">
                      <span>اوصف اعلانك</span>
                      <div className="textarea">
                        <textarea
                          cols="22"
                          name="description"
                          rows="6"
                          maxLength={4096}
                          onChange={(e) =>
                            setCounter(4096 - e.target.value.length)
                          }
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
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImg(e.target.files[0])}
                          hidden
                        />
                        {img ? (
                          <img
                            src={img}
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
                <div className="submit-ad">
                  <div className="check">
                    <input type="checkbox" name="" />
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
      <Chatbot />
      <Footer />
    </>
  );
}
