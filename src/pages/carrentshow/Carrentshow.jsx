import "./carrentshow.css";

// Import components
import Slider from "../../components/slider/Slider";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { CAR_RENT_URL } from "../../config";
import API from "../../API";
import { useLocation } from "react-router-dom";

export default function Page20() {
  const [price, setPrice] = useState('')
  const [images, setImages] = useState({})
  const [ad_name, setAdName] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [fuel_type, setFuelType] = useState('')
  const [body_type, setBodyType] = useState('')
  const [engine_capacity, setEngineCapacity] = useState('')
  const [adYear, setAdYear] = useState('')
  const [transmission_type, setTransmissionType] = useState('')
  const [rental_period, setRentalPeriod] = useState('')
  const [rental_option, setRentalOption] = useState('')
  const location = useLocation()

  useEffect(() => {
    async function fetchAd() {
      await API.getBy(CAR_RENT_URL, location.state.ad_id)
        .then(response => {
          setPrice(response.ad_id.price)
          setImages({ img: response.ad_id.ad_image.images })
          setAdName(response.ad_id.ad_name)
          setDescription(response.ad_id.description)
          setBrand(response.car.brand.brand)
          setModel(response.car.brand.model)
          setFuelType(response.car.fuel_type)
          setBodyType(response.car.body_type)
          setEngineCapacity(response.car.engine_capacity)
          setAdYear(Date(response.ad_id.created_date))
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
          setRentalPeriod(response.rental_period)
          setRentalOption(response.rental_option)
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
                <td>{model}</td>
                <td>موديل</td>
                <td className="color-main">{brand}</td>
                <td>الفئة</td>
              </tr>
              <tr>
                <td>{engine_capacity}</td>
                <td>المحرك ( سى سى )</td>

                <td className="color-main">{price}</td>
                <td>السعر</td>
              </tr>

              <tr>
                <td>{rental_period}</td>
                <td>مدة الايجار</td>
                <td className="color-main">{rental_option}</td>
                <td>نظام الايجار</td>
              </tr>
              <tr>
                <td>{transmission_type}</td>
                <td>ناقل للحركة</td>
                <td className="color-main">{body_type}</td>
                <td>نوع الهيكل</td>
              </tr>
              <tr>
                <td className="color-main">{fuel_type}</td>
                <td>نوع الوقود</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}
