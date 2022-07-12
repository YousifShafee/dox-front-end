import "./userAccount1.css";
import { Link } from "react-router-dom";

// Import components
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import Chatbot from "../../components/chatbot/Chatbot";
import { AD_URL } from "../../config";
import API, { fetchEmailAd } from "../../API";
import { useEffect, useState } from "react";
import { useLogin } from "../../components/login/useLogin";

export default function UserAccount1() {
  const [ads, setAds] = useState([])
  const deleteAd = async (ad_id) => {
    await API.deleteRequest(AD_URL, ad_id)
  }
  
  const navigate_edit = {
    car_sales: "100",
    car_rent: "101",
    property_sales: "102",
    property_rent: "103",
    mobile: "104",
    access: "105",
    midical: "106",
    electron: "107",
    furniture: "108",
  }

  const navigate_show = {
    car_sales: "200",
    car_rent: "201",
    property_sales: "202",
    property_rent: "203",
    mobile: "204",
    access: "205",
    midical: "206",
    electron: "207",
    furniture: "208",
  }
  
  useEffect(() => {
    async function setAd() {
      await fetchEmailAd(sessionStorage.getItem('userId'))
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
                    style={{ maxWidth: "300px" }}
                    alt="img cart"
                    className="scale-hover"
                  />
                </td>
                <td>{item.name}</td>
                <td>
                  <div className="edit-watch color-main">
                    <div className="edit-watch-ad">
                      <Link to={{
                        pathname: navigate_edit[item.type],
                        state: {ad_id: item.id},
                      }}>
                        <span>
                          عدل الاعلان
                        </span>
                      </Link>
                      <img
                        src="./assets/imgs/icon-edit.png"
                        alt="icon-watch"
                      />
                    </div>
                    <div className="edit-watch-ad">
                    <Link to={{
                        pathname: navigate_show[item.type],
                        state: {ad_id: item.id},
                      }}>
                      <span>شاهد الاعلان</span>
                      </Link>
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
      <Navbar />
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
