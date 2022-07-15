import "./furnitureedit.css";
import { useState, useEffect } from "react";

// Import components

import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import Chatbot from "../../components/chatbot/Chatbot";
import { Edit, FURNITURE_URL } from "../../config";
import API from "../../API"
import { useLocation } from "react-router-dom";

export default function Page23() {
  const [counter, setCounter] = useState(4096);
  const [img, setImg] = useState(undefined);
  const [ad_name, setAdName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('')
  const [condition, setCondition] = useState('')
  const [depart_name, setDepart_name] = useState('')
  const [attach, setAttach] = useState('')
  const location = useLocation()

  const [messages, setMessages] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    var request = new FormData();
    request.append('ad_name', ad_name)
    request.append('description', description)
    request.append('ad_image', img)
    request.append('price', price)
    request.append('condition', condition)
    request.append('name', depart_name)
    request.append('attach', attach)
    const response = await API.editRequest(FURNITURE_URL, location.state.ad_id, Edit, request);
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
    API.getBy(FURNITURE_URL, location.state.ad_id)
    .then(response => {
      setImg(response.ad_id.ad_image.images)
      setAdName(response.ad_id.ad_name)
      setDescription(response.ad_id.description)
      setPrice(response.ad_id.price)
      setCondition(response.condition)
      setDepart_name(response.department.name)
      setAttach(response.department.attach)
    })
    },[location])
  return (
    <>
      <Navbar />
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
                    {<input type="text" value="اثاث منزلى" />}
                    
                    
                  </div>
                  <div className="icons">
                    
                    <img
                      src="./assets/imgs/furniture.png"
                      alt="furniture"
                      className=""
                    />
                  </div>
                </div>
                <div className="search mt-3 mb-2 reset-inputs">
                  <div className="position-relative btn-icon">
                    <span className="mr-1 fs-1">اثاث منزلى</span>
                    <img
                      src="./assets/imgs/furniture.png"
                      alt="furniture"
                      className=""
                    />
                  </div>
                  <div className="inputs d-grid-2">
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="السعر" 
                      value={price} onChange={e => setPrice(e.target.value)}/>
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="الحالة" 
                      value={condition} onChange={e => setCondition(e.target.value)}/>
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="النوع" 
                      value={attach} onChange={e => setAttach(e.target.value)}/>
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="القسم" 
                      value={depart_name} onChange={e => setDepart_name(e.target.value)}/>
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
