import "./admin2Settings2.css";

// Import components
import AdminNavbar from "../../components/header/AdminNavbar";
import API, { fetchImage, fetchSearchField } from "../../API";
import { Active, Admin, AllWithoutAdLogoGeneral, IMAGE_URL, ViceD, ViceU } from "../../config";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Admin2Settings2() {
  const [ads, setAds] = useState([])
  const history = useHistory()
  const deleteAd = async (ad_id) => {
    await API.deleteRequest(IMAGE_URL, ad_id)
  }

  const searchAd = async (event) => {
    event.preventDefault();
    var { payment_n } = document.forms[0];
    var request = new FormData();
    request.append('payment_n', payment_n.value)
    set_res_ads(await fetchSearchField(IMAGE_URL, request))
  }

  const activeAd = async (ad_id) => {
    var request = new FormData()
    request.append('is_active', true)
    await API.editRequest(IMAGE_URL, ad_id, Active, request)
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
              <div className="delete-card">
                <button onClick={() => activeAd(item.id)} className="btn fs-1">
                  اضافة
                  <img
                    src="./assets/imgs/add.png"
                    alt="delete icon"
                    className="w-20"
                  />
                </button>
              </div>
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
          <td>{item.payment}</td>
          <td>{Date(item.ad_time)}</td>
        </tr>
      })
    )
  }

  useEffect(() => {
    let redirect_url = "admins-login"
    const mission = sessionStorage.getItem('adminMission')
    if (mission !== ViceU) {
      if (mission === Admin) {
        redirect_url = 'admin-1-settings-1'
      } else if (mission === ViceD) {
        redirect_url = 'admin-3-settings-1'
      }
      history.push(redirect_url)
      return
    }
    async function setAd() {
      await fetchImage(AllWithoutAdLogoGeneral, false)
        .then(response => {
          set_res_ads(response)
        })
    }
    setAd()
  }, [history])
  return (
    <>
      <div className="admin-settings">
        <AdminNavbar page={"sponsoredAd"} />
        <div className="fill-container">
          <div className="title-input">
            <h2 className="fs-1">الإعلانات المنشورة</h2>

            <form onSubmit={searchAd} className="search-input ">
              <input
                type="text"
                name="payment_n"
                placeholder="رقم عملية الدفع"
                className="fs-1"
              />
              <img src="./assets/imgs/search.png" alt="search" />
            </form>
          </div>
          <div className="table-box">
            <table className="styled-table fs-1">
              <tbody>
                <tr>
                  <td></td>
                  <td className="color-main">صورة الاعلان</td>
                  <td className="color-main">رقم عملية الدفع</td>
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
