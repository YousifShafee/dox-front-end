import { useEffect, useState } from "react";
import { Admin, Login, Logo, USER_URL, ViceD, ViceU } from "../../config";
import API, { fetchImage } from "../../API";
import "./adminsLogin.css";
import { useHistory } from "react-router-dom";

export default function AdminsLogin() {
  const [logo, setLogo] = useState('')
  const [messages, setMessages] = useState('');
  const history = useHistory()
  const setSession = (mission, userEmail, userId) => {
    sessionStorage.removeItem('adminId');
    sessionStorage.removeItem('adminEmail');
    sessionStorage.removeItem('adminMission');
    sessionStorage.setItem('adminMission', mission);
    sessionStorage.setItem('adminEmail', userEmail);
    sessionStorage.setItem('adminId', userId);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    var { email, password } = document.forms[0];
    var request = new FormData()
    request.append('email', email.value)
    request.append('password', password.value)
    request.append('mission', [Admin, ViceD, ViceU])
    const response = await API.postRequest(USER_URL, Login, request)
    if (response.status === 200) {
      setSession(response.data['mission'], response.data['email'], response.data['id']);
      let redirect_url = ''
      if(response.data['mission'] === Admin){
        redirect_url = 'admin-1-settings-1'
      } else if(response.data['mission'] === ViceU){
        redirect_url = 'admin-2-settings-1'
      } else if(response.data['mission'] === ViceD){
        redirect_url = 'admin-3-settings-1'
      }
      history.push(redirect_url)
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
  useEffect(() => {
    async function fetchLogo() {
      await fetchImage(Logo)
        .then(response => {
          setLogo(response[0])
        })
    }
    fetchLogo()
  }, [])
  return (
    <div className="admins-login fs-1">
      <div className="logo-header mt-2 ">
        <div className="logo-box">
        <img src={logo.img} className="logo" alt="logo" />
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
