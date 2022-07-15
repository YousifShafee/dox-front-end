import "./admin3Settings2.css";
import { useEffect, useState } from "react";

// Import components
import AdminNavbar from "../../components/header/AdminNavbar";
import { Admin, Edit, USER_URL, ViceD, ViceU } from "../../config";
import API from "../../API";
import { useLogin } from "../../components/login/useLogin";
import { useHistory } from "react-router-dom";

export default function Admin3Settings2() {
  // Show & Hide sections
  const [hideUpdatePass, setHideUpdatePass] = useState(false);
  const history = useHistory()
  const { adminId } = useLogin()

  const passSubmit = async (event) => {
    event.preventDefault();
    var { npass, rpass } = document.forms[0];
    if (npass.value !== rpass.value) {
      return
    }
    var request = new FormData()
    request.append('password', npass.value)
    await API.postRequest(USER_URL + adminId + '/', Edit, request)
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
  }, [history])
  return (
    <>
      <div className="admin-settings">
        <AdminNavbar page={"settings"} />
        <div className="fill-container">
          <div className="box">
            <div className="body">
              {/* Update password */}
              <div
                className="header fs-1"
                onClick={() => setHideUpdatePass(!hideUpdatePass)}
              >
                <img src="./assets/imgs/chevron-down.png" alt="chevron-down" />
                <span>تغيير كلمة السر</span>
              </div>
              {!hideUpdatePass && (
                <div className="settings">
                  <form onSubmit={passSubmit} className="settings-inputs">
                    <input
                      type="password"
                      name='npass'
                      placeholder="كلمة السر الجديدة"
                      className="fs-1"
                    />
                    <input
                      type="password"
                      name='rpass'
                      placeholder="إعادة كلمة السر الجديدة"
                      className="fs-1"
                    />
                    <div className="btns">
                      <button type="submit" className="btn fs-1 main">احفظ</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
