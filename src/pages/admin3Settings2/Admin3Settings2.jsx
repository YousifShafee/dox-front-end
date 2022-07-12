import "./admin3Settings2.css";
import { useState } from "react";

// Import components
import AdminNavbar from "../../components/header/AdminNavbar";
import { Edit, USER_URL, ViceD } from "../../config";
import API from "../../API";
import { useLogin } from "../../components/login/useLogin";

export default function Admin3Settings2() {
  // Show & Hide sections
  const [hideUpdatePass, setHideUpdatePass] = useState(false);
  const [messages, setMessages] = useState('');
  const { adminMission, isAdminLogin, adminId } = useLogin()

  const checkAdmin = () => {
    if (!isAdminLogin) {
      setMessages("يجب تسجيل دخول الأدمن")
      return false
    }
    if (adminMission !== ViceD) {
      setMessages("هذا المستخدم ليس له الصلاحية")
      return false
    }
    return true
  }

  const passSubmit = async (event) => {
    if (checkAdmin()) {
      event.preventDefault();
      var { npass, rpass } = document.forms[1];
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
  }

  return (
    <>
      <div className="admin-settings">
        <AdminNavbar page={"settings"} admin3={true} />
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
