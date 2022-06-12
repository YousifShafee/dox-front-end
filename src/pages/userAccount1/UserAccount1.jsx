import "./userAccount1.css";
import { Link } from "react-router-dom";

// Import components
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import Chatbot from "../../components/chatbot/Chatbot";
import { AD_URL } from "../../config";
import API, { fetchEmailAd } from "../../API";
import { useEffect, useState } from "react";

export default function UserAccount1() {
  const [ads, setAds] = useState([])
  const deleteAd = async (ad_id) => {
    await API.deleteRequest(AD_URL, ad_id)
  }
  useEffect(() => {
    async function setAd() {
      await fetchEmailAd('2')      // TODO change id value
        .then(response => {
          setAds(
            response.map(item => {
              return <tr>
                <td>
                  <div className="btns">
                    <div className="delete-card">
                      <button onClick={() => deleteAd(item.id)} className="btn fs-1">
                        حذف
                        <img
                          src="./assets/imgs/delete.png"
                          alt="delete icon"
                        />
                      </button>
                    </div>
                    <div>{item.price} ج.م</div>
                  </div>
                </td>
                <td>
                  <img
                    src={item.img}
                    alt="img cart"
                    className="scale-hover"
                  />
                </td>
                <td>{item.name}</td>
                <td>
                  <div className="edit-watch color-main">
                    <div className="edit-watch-ad">
                      <span>عدل الاعلان</span>
                      <img
                        src="./assets/imgs/icon-edit.png"
                        alt="icon-watch"
                      />
                    </div>
                    <div className="edit-watch-ad">
                      <span>شاهد الاعلان</span>
                      <img
                        src="./assets/imgs/icon-watch.png"
                        alt="icon-watch"
                      />
                    </div>
                  </div>
                </td>
                <td>{item.ad_time}</td>
              </tr>
            })
          )
        })
    }
    setAd()
  }, [])
  return (
    <>
      <Navbar user={true} />
      <div className="settings user-account-1">
        <div className="container">
          <div className="box">
            <div className="texts fs-1">
              <h4>اعلاناتى</h4>
              <p className="m-0">بامكانك هنا إدارة اعلاناتك المنشورة</p>
            </div>
            <div className="btns ">
              <Link to={"/user-settings"} className="btn fs-1 second">
                الاعدادات
              </Link>
              <Link to={"/user-account-1"} className="btn fs-1 main">
                الاعلانات
              </Link>
            </div>
            <div className="body admin-settings">
              <table className="styled-table fs-1">
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td colSpan={2}>الإعلانات المنشورة</td>
                  </tr>
                  <tr>
                    <td className="color-main">السعر</td>
                    <td className="color-main"></td>
                    <td className="color-main">اسم الاعلان</td>
                    <td></td>
                    <td className="color-main">التاريخ</td>
                  </tr>
                  {ads}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
      <Footer />
    </>
  );
}
