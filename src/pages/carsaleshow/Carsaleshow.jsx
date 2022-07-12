import "./carsaleshow.css";

// Import components
import Slider from "../../components/slider/Slider";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import Chatbot from "../../components/chatbot/Chatbot";
import API from "../../API";
import { useEffect, useState } from "react";
import { CAR_SALES_URL } from "../../config";
import { useLocation } from "react-router-dom";

export default function Page20() {
  const [price, setPrice] = useState('')
  const [images, setImages] = useState({})
  const [phone, setPhone] = useState('')
  const [ad_name, setAdName] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [fuel_type, setFuelType] = useState('')
  const [body_type, setBodyType] = useState('')
  const [engine_capacity, setEngineCapacity] = useState('')
  const [adYear, setAdYear] = useState('')
  const [carYear, setCarYear] = useState('')
  const [color, setColor] = useState('')
  const [transmission_type, setTransmissionType] = useState('')
  const [extra_features, setExtraFeatures] = useState([])
  const [rental_period, setRentalPeriod] = useState('')
  const [rental_option, setRentalOption] = useState('')
  const [condition, setCondition] = useState('')
  const [kilometer, setKilometer] = useState('')
  const [adType, setAdType] = useState('')
  const location = useLocation()

  useEffect(() => {
    async function fetchAd() {
      await API.getBy(CAR_SALES_URL, location.state.ad_id)
        .then(response => {
          setPrice(response.ad_id.price)
          setImages({img: response.ad_id.ad_image.images})
          setPhone(response.ad_id.user.phone)
          setAdName(response.ad_id.ad_name)
          setDescription(response.ad_id.description)
          setBrand(response.car.brand.brand)
          setModel(response.car.brand.model)
          setFuelType(response.car.fuel_type)
          setBodyType(response.car.body_type)
          setEngineCapacity(response.car.engine_capacity)
          setCarYear((new Date(response.car.year)).getFullYear())
          setAdYear(Date(response.ad_id.created_date))
          setColor(response.car.color)
          setTransmissionType(response.car.transmission_type)
          let extraH = [], extraR = response.car.extra_features
          for (let i = 0; i < extraR.length; i += 2) {
            extraH.push(
              <tr className="no-border">
                <td colSpan={2} className="text-center">{extraR[i]}</td>
                <td className="color-main">{extraR[i + 1]}</td>
              </tr>
            )
          }
          setExtraFeatures(extraH)
          setRentalPeriod(response.rental_period)
          setRentalOption(response.rental_option)
          setCondition(response.car.condition)
          setKilometer(response.kilometer)
          setAdType(response.offer_type)
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
              <button className="btn fs-1 f-bold">
                {price}
              </button>
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
          <table className="styled-table fs-1">
            <tbody>
              <tr>
                <td>{model}</td>
                <td>موديل</td>
                <td className="color-main">{brand}</td>
                <td>الفئة</td>
              </tr>
              <tr>
                <td>{adType}</td>
                <td>نوع الاعلان</td>
                <td className="color-main">{price}</td>
                <td>السعر</td>
              </tr>
              <tr>
                <td>{color}</td>
                <td>اللون</td>
                <td className="color-main">{condition}</td>
                <td>الحالة</td>
              </tr>
              <tr>
                <td>{kilometer}</td>
                <td>كيلومترات</td>
                <td className="color-main">{carYear}</td>
                <td>السنة</td>
              </tr>
              <tr>
                <td>{transmission_type}</td>
                <td>ناقل للحركة</td>
                <td className="color-main">{body_type}</td>
                <td>نوع الهيكل</td>
              </tr>
              <tr>
                <td>{engine_capacity}</td>
                <td>المحرك ( سى سى )</td>
                <td className="color-main">{fuel_type}</td>
                <td>نوع الوقود</td>
              </tr>
              <tr className="no-border" style={{ float: 'right' }}>
                <td></td>
                <td>الاضافات</td>
              </tr>
              {extra_features}
            </tbody>
          </table>
        </div>
      </div>
      <Chatbot />
      <Footer />
    </>
  );
}
