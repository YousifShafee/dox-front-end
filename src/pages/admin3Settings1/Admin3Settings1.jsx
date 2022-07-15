import "./admin3Settings1.css";

// Import components
import AdminNavbar from "../../components/header/AdminNavbar";
import { Admin, AD_URL, ViceD, ViceU } from "../../config";
import API, { fetchAd, fetchSearchField } from "../../API";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Admin3Settings1() {
  const history = useHistory()
  const [ads, setAds] = useState([])

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
              src={item.img}
              style={{ maxWidth: "300px" }}
              alt="img cart"
              className="scale-hover"
            />
          </td>
          <td>{item.payment}</td>
          <td>{Date(item.ad_time)}</td>
        </tr>
      })
    )
  }

  const deleteAd = async (ad_id) => {
    await API.deleteRequest(AD_URL, ad_id)
  }
  useEffect(() => {
    let redirect_url = "admins-login"
    const mission = sessionStorage.getItem('adminMission')
    if (mission !== ViceD) {
      if (mission === Admin) {
        redirect_url = 'admin-1-settings-1'
      } else if (mission === ViceU) {
        redirect_url = 'admin-2-settings-1'
      }
      history.push(redirect_url)
      return
    }
    async function setAd() {
      await fetchAd()
        .then(response => {
          set_res_ads(response)
        })
    }
    setAd()
  }, [history])
  return (
    <>
      <div className="admin-settings delete-ad-page">
        <AdminNavbar page={"delete"} />
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
