import "./page5.css";

// Import components
import Slider from "../../components/slider/Slider";
import AdCard from "../../components/adCard/AdCard";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import Chatbot from "../../components/chatbot/Chatbot";
import FavCompanies from "../../components/favCompanies/FavCompanies";
import { PROPERTIES_RENT_URL, PropertyF, Property } from "../../config";
import { fetchImage, fetchPageAd, fetchSearchAD } from "../../API";
import { useEffect } from "react";
import { useState } from "react";

export default function Page5() {
  const [images, setImages] = useState([])
  const [company, setCompany] = useState([])
  const [ads, setAds] = useState([])

  const searchAd = async (event) => {
    event.preventDefault();
    var { bathroom, bedroom, type, fprice, lprice, compound, furnished, area } = document.forms[1];
    var request = new FormData();
    request.append('bathroom', parseInt(bathroom.value))
    request.append('bedroom', parseInt(bedroom.value))
    request.append('type', type.value)
    request.append('lprice', parseInt(lprice.value))
    request.append('fprice', parseInt(fprice.value))
    request.append('compound', compound.value)
    request.append('furnished', furnished.value)            // Boolean Value
    request.append('area', parseInt(area.value))
    setAds(await fetchSearchAD(PROPERTIES_RENT_URL, request))
  }

  const getImages = async () => {
    setImages(await fetchImage(Property))
  }

  const getCompany = async () => {
    setCompany(await fetchImage(PropertyF))
  }

  const getAds = async () => {
    setAds(await fetchPageAd(PROPERTIES_RENT_URL))
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
            <span className="mr-1 fs-1">عقارات للايجار</span>
            <img src="./assets/imgs/home.png" alt="home" />
          </div>
          <div className="inputs">
            <div className="input position-relative d-flex ">
              <input name="lprice" type="text" placeholder="السعر الى" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input name="fprice" type="text" placeholder="السعر من" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input name="bathroom" type="text" placeholder="الحمامات" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input name="bedroom" type="text" placeholder="غرفة النوم" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input name="compound" type="text" placeholder="كموند" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input name="type" type="text" placeholder="النوع" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input name="furnished" type="text" placeholder="مفروش" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input name="amenities" type="text" placeholder="الكماليات" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex "></div>
            <div className="input position-relative d-flex ">
              <input name="area" type="text" placeholder="المساحة" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
          </div>
          <div className="btns my-1">
            <div className="add-box">
              <button className="btn btn-add  search-btn">
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
