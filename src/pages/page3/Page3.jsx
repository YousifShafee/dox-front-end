import "../page2/page2.css";

// Import components
import Slider from "../../components/slider/Slider";
import AdCard from "../../components/adCard/AdCard";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import Chatbot from "../../components/chatbot/Chatbot";
import FavCompanies from "../../components/favCompanies/FavCompanies";
import { CarF, Car, CAR_RENT_URL } from "../../config";
import { fetchImage, fetchPageAd, fetchSearchAD } from "../../API";
import { useState } from "react";
import { useEffect } from "react";

export default function Page3() {
  const [images, setImages] = useState([])
  const [company, setCompany] = useState([])
  const [ads, setAds] = useState([])

  const searchAd = async (event) => {
    event.preventDefault();
    var { brand, model, lprice, fprice ,transmission_type, body_type, engine_capacity, fuel_type, rental_option, rental_period } = document.forms[1];
    var request = new FormData();
    request.append('brand', brand.value)
    request.append('model', model.value)
    request.append('lprice', parseInt(lprice.value))
    request.append('fprice', parseInt(fprice.value))
    request.append('body_type', body_type.value)
    request.append('rental_option', rental_option.value)
    request.append('rental_period', rental_period.value)
    request.append('transmission_type', transmission_type.value)
    request.append('fuel_type', fuel_type.value)
    request.append('engine_capacity', parseInt(engine_capacity.value))
    setAds(await fetchSearchAD(CAR_RENT_URL, request))
  }

  const getImages = async () => {
    setImages(await fetchImage(Car))
  }

  const getCompany = async () => {
    setCompany(await fetchImage(CarF))
  }

  const getAds = async () => {
    setAds(await fetchPageAd(CAR_RENT_URL))
  }

  useEffect(() => {
    getImages()
    getCompany()
    getAds()
  }, [])
  return (
    <>
      <Navbar />
      <div className="fill-container d-flex mt-2">
        <Slider
          imgs={images}
        />
        <form onSubmit={searchAd} className="search">
          <div className="position-relative btn-icon">
            <span className="mr-1 fs-1">سيارات للايجار</span>
            <img src="./assets/imgs/car.png" alt="car" />
          </div>
          <div className="inputs">
            <div className="input position-relative d-flex ">
              <input type="text" name="model" placeholder="موديل" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input type="text" name="brand" placeholder="اختر الفئة" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input type="text" name="lprice" placeholder="السعر الى" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input type="text" name="fprice" placeholder="السعر من" />
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
              <input type="text" name="fuel_type" placeholder="نوع الوقود" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input type="text" name="rental_option" placeholder="نظام الايجار" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input type="text" name="rental_period" placeholder="مدة الايجار" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
          </div>
          <div className="btns my-1">
            <div className="add-box">
              <button type="submit" className="btn btn-add  search-btn">
                <span className="fs-1">ابحث</span>
                <img
                  className="add-icon"
                  src="./assets/imgs/search.png"
                  alt="add"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
      <FavCompanies imgs={company} />

      <div className="container">
        <div className="ads">
          {ads.map((ad) => (
            <AdCard card={ad} />
          ))}
        </div>
      </div>
      <Chatbot />
      <Footer />
    </>
  );
}
