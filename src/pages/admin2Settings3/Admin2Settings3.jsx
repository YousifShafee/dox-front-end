import "./admin2Settings3.css";
import { useEffect, useState } from "react";

// Import components
import AdminNavbar from "../../components/header/AdminNavbar";
import { ViceU, Edit, USER_URL, ViceD, Admin } from "../../config";
import API from "../../API";
import { useLogin } from "../../components/login/useLogin";
import { useHistory } from "react-router-dom";

export default function Admin2Settings3() {
  // Show & Hide sections
  const [messages, setMessages] = useState('');
  const [hideUpdatePass, setHideUpdatePass] = useState(false);
  const { adminId } = useLogin()
  const history = useHistory()
  const passSubmit = async (event) => {
    event.preventDefault();
    var { npass, rpass } = document.forms[0];
    if (npass.value !== rpass.value) {
      setMessages('كلمة السر المرور الجديدة غير متطابقة')
      return
    }
    var request = new FormData()
    request.append('password', npass.value)
    const response = await API.postRequest(USER_URL + adminId + '/', Edit, request)
    if (response.status === 200) {
      setMessages('تم تغيير البيانات بنجاح')
    } else if (response.status === 400) {
      setMessages(response.data.data[0])
      // setIsSubmit(true)
    } else {
      setMessages('حدث خطأ أثناء تغيير البيانات')
    }
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
  }, [history])
  return (
    <>
      <div className="admin-settings">
        <AdminNavbar page={"settings"} />
        <div className="fill-container">
          <div className="box">
            <div className="body">
              {messages}
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
                      name="npass"
                      placeholder="كلمة السر الجديدة"
                      className="fs-1"
                    />
                    <input
                      type="password"
                      name="rpass"
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
