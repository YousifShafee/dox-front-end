import "./page4.css";

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
import { PROPERTIES_SALES_URL, PropertyF, Property } from "../../config";

export default function Page4() {
  const [images, setImages] = useState([])
  const [company, setCompany] = useState([])
  const [ads, setAds] = useState([])

  const searchAd = async (event) => {
    event.preventDefault();
    var { bathroom, bedroom, type, fprice, lprice, compound, furnished, area, delivery_date, delivery_term, payment } = document.forms[1];
    var request = new FormData();
    request.append('bathroom', parseInt(bathroom.value))
    request.append('bedroom', parseInt(bedroom.value))
    request.append('type', type.value)
    request.append('lprice', parseInt(lprice.value))
    request.append('fprice', parseInt(fprice.value))
    request.append('compound', compound.value)
    request.append('furnished', furnished.value)            // Boolean Value
    request.append('area', parseInt(area.value))
    request.append('delivery_date', delivery_date.value)
    request.append('delivery_term', delivery_term.value)
    request.append('payment', payment.value)
    setAds(await fetchSearchAD(PROPERTIES_SALES_URL, request))
  }

  const getImages = async () => {
    setImages(await fetchImage(Property))
  }

  const getCompany = async () => {
    setCompany(await fetchImage(PropertyF))
  }

  const getAds = async () => {
    setAds(await fetchPageAd(PROPERTIES_SALES_URL))
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
            <span className="mr-1 fs-1">???????????? ??????????</span>
            <img src="./assets/imgs/home.png" alt="home" />
          </div>
          <div className="inputs">
            <div className="input position-relative d-flex ">
              <input type="text" name="lprice" placeholder="?????????? ??????" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input type="text" name='fprice' placeholder="?????????? ????" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input type="text" name="bathroom" placeholder="????????????????" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input type="text" name="bedroom" placeholder="???????? ??????????" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input type="text" name="compound" placeholder="??????????" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input type="text" name="type" placeholder="??????????" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input type="text" name="furnished" placeholder="??????????" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input type="text" name="amenities" placeholder="??????????????????" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input type="text" name="delivery_term" placeholder="???????? ??????????????" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input type="text" name="delivery_date" placeholder="?????????? ??????????????" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input type="text" name="payment" placeholder="?????????? ??????????" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
            <div className="input position-relative d-flex ">
              <input type="text" name="area" placeholder="??????????????" />
              <img src="./assets/imgs/down-arrow.png" alt="icon" />
            </div>
          </div>
          <div className="btns my-1">
            <div className="add-box">
              <button type="submit" className="btn btn-add  search-btn">
                <span className="fs-1">????????</span>
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
