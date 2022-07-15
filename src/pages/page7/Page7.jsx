import "./page7.css";

// Import components
import Slider from "../../components/slider/Slider";
import AdCard from "../../components/adCard/AdCard";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import Chatbot from "../../components/chatbot/Chatbot";
import FavCompanies from "../../components/favCompanies/FavCompanies";
import { useState } from "react";
import { useEffect } from "react";
import { fetchImage, fetchPageAd, fetchSearchAD } from "../../API";
import { Access, AccessF, ACCESS_URL } from "../../config";

export default function Page7() {
  const [images, setImages] = useState([])
  const [company, setCompany] = useState([])
  const [ads, setAds] = useState([])
  
  const searchAd = async (event) => {
    event.preventDefault();
    var { fprice, lprice, condition, type } = document.forms[1];
    var request = new FormData();
    request.append('lprice', parseInt(lprice.value))
    request.append('fprice', parseInt(fprice.value))
    request.append('condition', condition.value)
    request.append('type', type.value)
    setAds(await fetchSearchAD(ACCESS_URL, request))
  }

  const getImages = async () => {
    setImages(await fetchImage(Access))
  }

  const getCompany = async () => {
    setCompany(await fetchImage(AccessF))
  }

  const getAds = async () => {
    setAds(await fetchPageAd(ACCESS_URL))
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
          imgs={ images }
        />
        <form onSubmit={searchAd} className="search">
          <div className="position-relative btn-icon">
            <span className="mr-1 fs-1">اكسسوارات</span>
            <img src="./assets/imgs/accessory.png" alt="accessory" />
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
              <input name="type" type="text" placeholder="النوع" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input name="condition" type="text" placeholder="الحالة" />
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
      <FavCompanies
        imgs={ company }
      />

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
