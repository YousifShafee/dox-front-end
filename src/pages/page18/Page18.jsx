import "./page18.css";
import { useState, useEffect } from "react";

// Import components

import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import Chatbot from "../../components/chatbot/Chatbot";
import { AD_URL, Edit } from "../../config";
import API from "../../API"

export default function Page18() {
  const [counter, setCounter] = useState(4096);
  const [img, setImg] = useState(undefined);
  const [ad_name, setAdName] = useState('');
  const [email, setEmail] = useState('');
  const [uname, setUname] = useState('');
  const [uphone, setUphone] = useState('');
  const [ad_type, setAdType] = useState('');
  const [description, setDescription] = useState('');

  const [messages, setMessages] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    var request = new FormData();
    request.append('ad_name', ad_name)
    request.append('email', email)
    request.append('uname', uname)
    request.append('uphone', uphone)
    request.append('ad_type', ad_type)
    request.append('description', description)
    request.append('image', img)
    const response = await API.editRequest(AD_URL , '1', Edit, request)          // TODO change this id value
    if (response.status === 200) {
      setMessages('تم حفظ التعديلات بنجاح')
    } else if (response.status === 404) {
      setMessages('هذا البريد غير موجود')
    } else if (response.status === 400) {
      setMessages(response.data.data[0])
      // setIsSubmit(true)
    } else {
      setMessages('حدث خطأ أثناء حفظ الإعلان')
    }
  }
  useEffect(()=>{
    API.getBy(AD_URL, '1')                      // TODO change this id value
    .then(response => {
      setImg(response.ad_image.images)
      setAdName(response.ad_name)
      setEmail(response.user.email)
      setUname(response.user.first_name + " " + response.user.last_name)
      setUphone(response.user.phone)
      setDescription(response.description)
    })
    },[])
  return (
    <>
      <Navbar user={true} />
      <div className="ad-adver">
        <div className="container">
          <div className="box">
            <div className="head fs-1">تعديل الاعلان</div>
            <div className="body">
              <form onSubmit={handleSubmit} className="inputs ">
                {messages}
                <div className="name">
                  <span>اسم الاعلان</span>
                  <input value={ad_name} onChange={e => setAdName(e.target.value)} type="text" />
                </div>
                <div className="type">
                  <span>صنف الاعلان</span>
                  <div className="input position-relative d-flex ">
                    <input type="text" value="سيارات للبيع" />
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
                    <span className="mr-1 fs-1">سيارات للبيع</span>
                    <img src="./assets/imgs/car.png" alt="car" />
                  </div>
                  <div className="inputs d-grid-2">
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="موديل" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="اختر الفئة" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="نوع الاعلان" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="السعر" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="اللون" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="الحالة" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="كيلومترات" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="السنة" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="ناقل الحركة" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="نوع الهيكل" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="المحرك (سى سى )" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="نوع الوقود" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex "></div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="اضافات" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                  </div>
                </div>
                <div className="name-email">
                  <div className="email">
                    <span>الايميل</span>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div className="name">
                    <span>الاسم</span>
                    <input type="text" value={uname} onChange={e => setUname(e.target.value)} />
                  </div>
                </div>
                <div className="details">
                  <div className="phone-desc">
                    <div className="phone">
                      <span>رقم الموبيل</span>
                      <input onChange={e => {
                        setUphone(e.target.value)}
                       }
                        value={uphone} type="text" />
                    </div>
                    <div className="desc">
                      <span>اوصف اعلانك</span>
                      <div className="textarea">
                        <textarea
                          cols="22"
                          value={description}
                          rows="6"
                          maxLength={4096}
                          onChange={(e) =>
                            {
                              setCounter(4096 - e.target.value.length)
                              setDescription(e.target.value)
                            }
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
