import "./mobileshow.css";

// Import components
import Slider from "../../components/slider/Slider";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { MOBILE_URL } from "../../config";
import API from "../../API";
import { useLocation } from "react-router-dom";

export default function Page20() {
  const [price, setPrice] = useState('')
  const [adYear, setAdYear] = useState('')
  const [images, setImages] = useState({})
  const [ad_name, setAdName] = useState('')
  const [description, setDescription] = useState('')
  const [condition, setCondition] = useState('')
  const [brand, setBrand] = useState('')
  const [type, setType] = useState('')
  const [warranty, setWarranty] = useState('')
  const [payment, setPayment] = useState('')
  const location = useLocation()

  useEffect(() => {
    async function fetchAd() {
      await API.getBy(MOBILE_URL, location.state.ad_id)
        .then(response => {
          setPrice(response.ad_id.price)
          setImages({ img: response.ad_id.ad_image.images })
          setAdYear(Date(response.ad_id.created_date))
          setAdName(response.ad_id.ad_name)
          setDescription(response.ad_id.description)
          setCondition(response.condition)
          setBrand(response.mobile.brand)
          setType(response.mobile.type)
          setWarranty(response.warranty)
          setPayment(response.payment)
        })
        .catch(e => console.error(e))
    }
    fetchAd();
  }, [])
  return (
    <>
      <Navbar />
      <div className="ad-show">
        <div className="fill-container">
          <div className="header">
            <div className="title fs-1">
              <p>اسم الاعلان&nbsp;&nbsp;&nbsp;<span>|</span>{ad_name}</p> <br /> عنوان الاعلان<span>|</span> تم إضافة
              الإعلان في {adYear}
            </div>
            <div className="btns">
              <button className="btn fs-1 f-bold">{price} ج,م</button>
              <button className="fs-1 f-bold btn-icon">
                01067764726
                <img
                  className="add-icon"
                  src="./assets/imgs/phone.png"
                  alt="add"
                />
              </button>
            </div>
          </div>
          <Slider
            imgs={[images]}
          />
          <table class="styled-table fs-1">
            <tbody>
              <tr>
                <td>{price}</td>
                <td>السعر</td>
                <td className="color-main">{condition}</td>
                <td>الحالة</td>
              </tr>
              <tr>
                <td>{brand}</td>
                <td>الماركة</td>

                <td className="color-main">{type}</td>
                <td>النوع</td>
              </tr>

              <tr>
                <td>{payment}</td>
                <td>طريقة الدفع</td>
                <td className="color-main">{warranty ? 'نعم' : 'لا'}</td>
                <td>الضمان</td>
              </tr>


            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}
