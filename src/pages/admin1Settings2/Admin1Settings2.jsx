import "./admin1Settings2.css";

// Import components
import AdminNavbar from "../../components/header/AdminNavbar";
import { useEffect, useState } from "react";
import API, { fetchAd, fetchSearchField } from "../../API";
import { Active, AD_URL, Search } from "../../config";

export default function Admin1Settings2() {
  const [ads, setAds] = useState([])

  const searchAd = async (event) => {
    event.preventDefault();
    var { payment_n } = document.forms[0];
    var request = new FormData();
    request.append('payment_n', payment_n.value)
    set_res_ads(await fetchSearchField(AD_URL, request))
  }

  const deleteAd = async (ad_id) => {
    await API.deleteRequest(AD_URL, ad_id)
  }

  const activeAd = async (ad_id) => {
    var request = new FormData()
    request.append('is_active', true)
    await API.editRequest(AD_URL, ad_id, Active, request)
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
      <div className="admin-settings">
        <AdminNavbar page={"sponsoredAd"} admin1={true} />
        <div className="fill-container">
          <div className="title-input">
            <h2 className="fs-1">الإعلانات المنشورة</h2>

            <form onSubmit={searchAd} className="search-input ">
              <input
                name="payment_n"
                type="text"
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
