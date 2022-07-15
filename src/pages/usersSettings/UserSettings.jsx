import "./userSettings.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Import components
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import Chatbot from "../../components/chatbot/Chatbot";
import { Edit, USER_URL } from "../../config";
import API from "../../API";
import { useLogin } from "../../components/login/useLogin";

export default function UserSettings() {
  const [hidePersonal, setHidePersonal] = useState(false);
  const [hidePasswords, setHidePasswords] = useState(false);

  const [phone, setPhone] = useState('');
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [messages, setMessages] = useState('');
  const {userId} = useLogin()
  
  const dataSubmit = async (event) => {
    event.preventDefault();
    var request = new FormData()
    request.append('first_name', fname)
    request.append('last_name', lname)
    request.append('phone', phone)
    editSubmit(request)
  }

  const passSubmit = async (event) => {
    event.preventDefault();
    var { npass, rpass } = document.forms[1];
    if (npass.value !== rpass.value) {
      setMessages('كلمة السر المرور الجديدة غير متطابقة')
      return
    }
    var request = new FormData()
    request.append('password', npass.value)
    editSubmit(request)
  }

  const editSubmit = async (request) => {
    const response = await API.postRequest(USER_URL + userId + '/', Edit, request)
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
    const getData = async () => {
      await API.getBy(USER_URL, userId)
        .then(response => {
          setFName(response.first_name)
          setLName(response.last_name)
          setPhone(response.phone)
        })
    }
    getData()
  }, [userId])
  return (
    <>
      <Navbar />
      <div className="settings">

        <div className="container">
          <div className="box">
            <div className="texts fs-1">
              <h4>اعدادات الحساب</h4>
              <p className="m-0">بامكانك هنا تغيير اعدادات حسابك</p>
            </div>
            <div className="btns ">
              <Link to={"/user-settings"} className="btn fs-1 main">
                الاعدادات
              </Link>
              <Link to={"/user-account-1"} className="btn fs-1 second">
                الاعلانات
              </Link>
            </div>
            <div className="body">
              <div style={{ textAlign: "center" }}>{messages}</div>
              {/* Personal Information */}
              <div
                className="header fs-1"
                onClick={() => setHidePersonal(!hidePersonal)}
              >
                <img src="./assets/imgs/chevron-down.png" alt="chevron-down" />
                <span>تغيير المعلومات الشخصية</span>
              </div>
              {!hidePersonal && (
                <form onSubmit={dataSubmit} className="settings-inputs">
                  <input name="fname" type="text"
                    onChange={e => { setFName(e.target.value) }}
                    value={fname} className="fs-1" />
                  <input name="lname" type="text"
                    onChange={e => { setLName(e.target.value) }}
                    value={lname} className="fs-1" />
                  <input
                    onChange={e => {
                      setPhone(e.target.value)
                    }
                    }
                    name="phone"
                    type="tel"
                    value={phone}
                    className="fs-1"
                  />
                  <div className="btns">
                    <button type="submit" className="btn fs-1 main">احفظ</button>
                  </div>
                </form>
              )}
              {/* Password Reset */}
              <div
                className="header fs-1"
                onClick={() => setHidePasswords(!hidePasswords)}
              >
                <img src="./assets/imgs/chevron-down.png" alt="chevron-down" />
                <span>تغيير كلمة السر</span>
              </div>
              {!hidePasswords && (
                <form onSubmit={passSubmit} className="settings-inputs">
                  <input
                    name="npass"
                    type="password"
                    placeholder="كلمة السر الجديدة"
                    className="fs-1"
                  />
                  <input
                    name="rpass"
                    type="password"
                    placeholder="إعادة كلمة السر الجديدة"
                    className="fs-1"
                  />
                  <div className="btns">
                    <button type="submit" className="btn fs-1 main">احفظ</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
      <Footer />
    </>
  );
}
