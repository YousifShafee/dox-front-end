import "./page1.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import components
import Slider from "../../components/slider/Slider";
import AdCard from "../../components/adCard/AdCard";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import Chatbot from "../../components/chatbot/Chatbot";
import { General } from '../../config'
import { fetchImage, fetchAd } from '../../API'

export default function Page1() {
  const [hideLinks1, setHideLinks1] = useState(false);
  const [hideLinks2, setHideLinks2] = useState(false);
  const [images, setImages] = useState([])
  const [ads, setAds] = useState([])

  const getImages = async () => {
    setImages(await fetchImage(General))
  }

  const getAds = async () => {
    setAds(await fetchAd())
  }

  useEffect(() => {
    getImages()
    getAds()
  }, [])

  return (
    <>
      {/* { resData } */}
      <Navbar />
      <div className="products">
        <div className="container">
          <ul className="list">
            <li className="mb-2">
              <span className="mr-1 fs-1">منتجاتنا</span>
              <img src="./assets/imgs/shopping-cart_1.png" alt="cart" />
            </li>
            <div className="options">
              <div className="position-relative">
                <Link
                  to="/"
                  onClick={() => {
                    setHideLinks1(!hideLinks1);
                    setHideLinks2(false);
                  }}
                >
                  <li>
                    <span className="mr-1 fs-1">سيارات</span>
                    <img src="./assets/imgs/car.png" alt="car" />
                  </li>
                </Link>
                {hideLinks1 && (
                  <ul className="two-link fs-1">
                    <li>
                      <Link to={"/2"}>
                        <span>للبيع</span>
                      </Link>
                    </li>
                    <li>
                      <Link to={"/3"}>
                        <span>للايجار</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              <div className="position-relative">
                <Link
                  to="/"
                  onClick={() => {
                    setHideLinks2(!hideLinks2);
                    setHideLinks1(false);
                  }}
                >
                  <li>
                    <span className="mr-1 fs-1">عقارات</span>
                    <img src="./assets/imgs/home.png" alt="home" />
                  </li>
                </Link>
                {hideLinks2 && (
                  <ul className="two-link fs-1">
                    <li>
                      <Link to={"/4"}>
                        <span>للبيع</span>
                      </Link>
                    </li>
                    <li>
                      <Link to={"/5"}>
                        <span>للايجار</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              <Link to="/6">
                <li>
                  <span className="mr-1 fs-1">موبايلات</span>
                  <img src="./assets/imgs/mobile-phone.png" alt="mobile" />
                </li>
              </Link>
              <Link to="/7">
                <li>
                  <span className="mr-1 fs-1">اكسسوارات</span>
                  <img src="./assets/imgs/accessory.png" alt="accessory" />
                </li>
              </Link>
              <Link to="/8">
                <li>
                  <span className="mr-1 fs-1 position-relative">
                    مستلزمات طبيه
                  </span>
                  <img
                    src="./assets/imgs/diagnosis_1.png"
                    alt="diagnosis_1"
                    className="position-absolute r-3"
                  />
                </li>
              </Link>
              <Link to="/9">
                <li>
                  <span className="mr-1 fs-1 position-relative">
                    الكترونيات وأجهزة منزلية
                  </span>
                  <img
                    src="./assets/imgs/electronics.png"
                    alt="electronics"
                    className="position-absolute r-3"
                  />
                </li>
              </Link>
              <Link to="/10">
                <li>
                  <span className="mr-1 fs-1 position-relative">
                    اثاث منزلى - ديكور
                  </span>
                  <img
                    src="./assets/imgs/furniture.png"
                    alt="furniture"
                    className="position-absolute r-3"
                  />
                </li>
              </Link>
            </div>
          </ul>
          <Slider
            imgs={images}
          />
        </div>
      </div>
      <div className="container">
        <div className="title position-relative">
          <span className="fs-1 d-block">احدث الاعلانات</span>
          <svg viewBox="0 0 168 1">
            <path className="line" d="M 0 0 L 168 0"></path>
          </svg>
        </div>
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
