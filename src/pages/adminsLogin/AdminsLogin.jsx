import { useState } from "react";
import { Admin, Login, USER_URL, ViceD, ViceU } from "../../config";
import API from "../../API";
import "./adminsLogin.css";

export default function AdminsLogin() {
  const [messages, setMessages] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    var { email, password } = document.forms[0];
    var request = new FormData()
    request.append('email', email.value)
    request.append('password', password.value)
    request.append('mission', [Admin, ViceD, ViceU])
    const response = await API.postRequest(USER_URL, Login, request)
    if (response.status === 200) {
      setMessages('تم تسجيل الدخول بنجاح')
    } else if (response.data.data[0] === "Not Active") {
      setMessages('هذا الحساب غير مفعل')
    } else if (response.data.data[0] === "Not Allowed") {
      setMessages('هذا الحساب غير مصرح له')
    } else if (response.status === 400) {
      setMessages(response.data.data[0])
      // setIsSubmit(true)
    } else {
      setMessages('حدث خطأ أثناء تسجيل الدخول')
    }
  }
  return (
    <div className="admins-login fs-1">
      <div className="logo-header mt-2 ">
        <div className="logo-box">
          <img src="./assets/imgs/logo.png" className="logo" alt="logo" />
          <div className="dox">
            D<span className="text-light">o</span>X
          </div>
        </div>
      </div>
      <h2 className="text-light">System Adminstrator</h2>
      <h2 className="text-reflect">System Adminstrator</h2>
      {messages}
      <form onSubmit={handleSubmit}>
        <div className="input mt-1">
          <span className="text-light">Admin</span>
          <input name="email" className="ml-1 fs-1" />
        </div>
        <div className="input">
          <span className="text-light">Password</span>
          <input name="password" type="password" className="fs-1" />
        </div>
        <div className="btns">
          <button type="submit" className="btn fs-1">Log In</button>
        </div>
      </form>
    </div>
  );
}
