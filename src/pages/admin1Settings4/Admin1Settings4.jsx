import "./admin1Settings4.css";

// Import components
import AdminNavbar from "../../components/header/AdminNavbar";
import { useState } from "react";
import { useEffect } from "react";
import { AD_URL } from "../../config";
import API, { fetchAd, fetchSearchField } from "../../API";

export default function Admin3Settings1() {
  const [ads, setAds] = useState([])

  const deleteAd = async (ad_id) => {
    await API.deleteRequest(AD_URL, ad_id)
  }

  const searchAd = async (event) => {
    event.preventDefault();
    var { ad_name } = document.forms[0];
    var request = new FormData();
    request.append('ad_name', ad_name.value)
    set_res_ads(await fetchSearchField(AD_URL, request))
  }

  const set_res_ads = (response) => {
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
              style={{ maxWidth: "300px" }}
              src={item.img}
              alt="img cart"
              className="scale-hover"
            />
          </td>
          <td>{item.name}</td>
          <td>{item.ad_time}</td>
        </tr>
      })
    )
  }

  useEffect(() => {
    async function setAd() {
      await fetchAd()
        .then(response => {
          set_res_ads(response)
        })
    }
    setAd()
  }, [])
  return (
    <>
      <div className="admin-settings delete-ad-page">
        <AdminNavbar page={"delete"} admin1={true} />
        <div className="fill-container">
          <div className="title-input">
            <h2 className="fs-1">الإعلانات المنشورة</h2>

            <form onSubmit={searchAd} className="search-input ">
              <input name="ad_name" type="text" placeholder="اسم الاعلان" className="fs-1" />
              <img src="./assets/imgs/search.png" alt="search" />
            </form>
          </div>
          <div className="table-box">
            <table className="styled-table fs-1">
              <tbody>
                <tr>
                  <td className="color-main">السعر</td>
                  <td className="color-main"></td>
                  <td className="color-main">اسم الاعلان</td>
                  <td className="color-main">التاريخ</td>
                </tr>
                {ads}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
