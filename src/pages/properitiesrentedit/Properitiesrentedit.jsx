import "./properitiesrentedit.css";
import { useState, useEffect } from "react";

// Import components

import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import Chatbot from "../../components/chatbot/Chatbot";
import { Edit, PROPERTIES_RENT_URL } from "../../config";
import API from "../../API"
import { useLocation } from "react-router-dom";

export default function Page18() {
  const [counter, setCounter] = useState(4096);
  const [img, setImg] = useState(undefined);
  const [ad_name, setAdName] = useState('');
  const [description, setDescription] = useState('');
  const location = useLocation()
  const [price, setPrice] = useState('')
  const [bedroom, setBedroom] = useState('')
  const [bathroom, setBathroom] = useState('')
  const [type, setType] = useState('')
  const [compound, setCompound] = useState('')
  const [area, setArea] = useState('')

  const [messages, setMessages] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    var request = new FormData();
    request.append('ad_name', ad_name)
    request.append('description', description)
    request.append('ad_image', img)
    request.append('price', price)
    request.append('bedroom', bedroom)
    request.append('bathroom', bathroom)
    request.append('type', type)
    request.append('compound', compound)
    request.append('area', area)
    const response = await API.editRequest(PROPERTIES_RENT_URL, location.state.ad_id, Edit, request);
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
    API.getBy(PROPERTIES_RENT_URL, location.state.ad_id)
    .then(response => {
      setImg(response.ad_id.ad_image.images)
      setAdName(response.ad_id.ad_name)
      setDescription(response.ad_id.description)
      setPrice(response.ad_id.price)
      setBedroom(response.properties.bedroom)
      setBathroom(response.properties.bathroom)
      setType(response.properties.type)
      setCompound(response.properties.compound)
      setArea(response.properties.area)
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
                    { <input type="text" value="عقارات للايجار" /> }
                    
                    
                  </div>
                  <div className="icons">
                    
                    <img src="./assets/imgs/home.png" alt="home" />
                    
                  </div>
                </div>
                <div className="search mt-3 mb-2 reset-inputs">
                  <div className="position-relative btn-icon">
                    <span className="mr-1 fs-1">عقارات للايجار</span>
                    <img src="./assets/imgs/home.png" alt="home" />
                  </div>
                  <div className="inputs d-grid-2">
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="السعر" 
                      value={price} onChange={e => setPrice(e.target.value)}/>
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="غرف النوم" 
                      value={bedroom} onChange={e => setBedroom(e.target.value)}/>
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="الحمامات" 
                      value={bathroom} onChange={e => setBathroom(e.target.value)}/>
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="النوع" 
                      value={type} onChange={e => setType(e.target.value)}/>
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="كمبوند" 
                      value={compound} onChange={e => setCompound(e.target.value)}/>
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="الكماليات" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="مفروش" />
                      <img src="./assets/imgs/down-arrow.png" alt="icon" />
                    </div>
                    <div className="input position-relative d-flex ">
                      <input type="text" placeholder="المساحة" 
                      value={area} onChange={e => setArea(e.target.value)}/>
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
