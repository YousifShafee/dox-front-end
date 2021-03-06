import "./properitiesrentshow.css";

// Import components
import Slider from "../../components/slider/Slider";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PROPERTIES_RENT_URL } from "../../config";
import API from "../../API";

export default function Page20() {
  const [price, setPrice] = useState('')
  const [images, setImages] = useState({})
  const [ad_name, setAdName] = useState('')
  const [furnished, setFurnished] = useState('')
  const [description, setDescription] = useState('')
  const [amenities, setAmenities] = useState('')
  const [bedroom, setBedroom] = useState('')
  const [bathroom, setBathroom] = useState('')
  const [type, setType] = useState('')
  const [compound, setCompound] = useState('')
  const [area, setArea] = useState('')
  const [adYear, setAdYear] = useState('')
  const location = useLocation()

  useEffect(() => {
    async function fetchAd() {
      await API.getBy(PROPERTIES_RENT_URL, location.state.ad_id)
        .then(response => {
          setPrice(response.ad_id.price)
          setImages({ img: response.ad_id.ad_image.images })
          setAdName(response.ad_id.ad_name)
          setDescription(response.ad_id.description)
          setFurnished(response.properties.furnished)
          setAdYear(Date(response.ad_id.created_date))
          setBedroom(response.properties.bedroom)
          setBathroom(response.properties.bathroom)
          setType(response.properties.type)
          setCompound(response.properties.compound)
          setArea(response.properties.area)
          let extraH = [], extraR = response.properties.amenities
          for (let i = 0; i < extraR.length; i += 2) {
            extraH.push(
              <tr className="no-border">
                <td colSpan={2} className="text-center">{extraR[i]}</td>
                <td className="color-main">{extraR[i + 1]}</td>
              </tr>
            )
          }
          // setAmenities(extraH)
        })
        .catch(e => console.error(e))
    }
    fetchAd();
  }, [location])
  return (
    <>
      <Navbar />
      <div className="ad-show">
        <div className="fill-container">
          <div className="header">
            <div className="title fs-1">
              <p>?????? ??????????????&nbsp;&nbsp;&nbsp;<span>|</span>{ad_name}</p> <br /> ?????????? ??????????????<span>|</span> ???? ??????????
              ?????????????? ???? {adYear}
            </div>
            <div className="btns">
              <button className="btn fs-1 f-bold">{price} ??,??</button>
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
                <td>??????????</td>
                <td className="color-main">{bedroom}</td>
                <td>?????? ??????????</td>
              </tr>
              <tr>
                <td>{bathroom}</td>
                <td>????????????????</td>

                <td className="color-main">{type}</td>
                <td>??????????</td>
              </tr>

              <tr>
                <td>{compound}</td>
                <td>????????????</td>
                <td className="color-main">{amenities}</td>
                <td>??????????????????</td>

              </tr>
              <tr>
                <td>{furnished ? '??????' : '????'}</td>
                <td>??????????</td>
                <td className="color-main">{area} ??</td>
                <td>??????????????</td>
              </tr>


            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}
