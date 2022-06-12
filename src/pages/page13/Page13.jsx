import "./page13.css";
import { Link } from "react-router-dom";
import API from "../../API";
import { useState } from "react";
import { Login, NormalU, USER_URL } from "../../config";

export default function Page13() {
  const [messages, setMessages] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    var { email, password } = document.forms[0];
    var request = new FormData()
    request.append('email', email.value)
    request.append('password', password.value)
    request.append('mission', [NormalU])
    const response = await API.postRequest(USER_URL, Login, request)
    if (response.status === 200) {
      setMessages('تم تسجيل الدخول بنجاح')
    } else if(response.data.data[0] === "Not Active") {
      setMessages('هذا الحساب غير مفعل')
    } else if (response.status === 400) {
      setMessages(response.data.data[0])
      // setIsSubmit(true)
    } else {
      setMessages('حدث خطأ أثناء تسجيل الدخول')
    }
  }
    return (
      <>
        <div className="auth auth-login ">
          <div className="container ">
            {/* Header */}
            <Link to={"/"}>
              <div className="dox">
                D<span className="text-dark">o</span>X
              </div>
            </Link>
            {/* Auth card */}
            <div className="card w-40">
              <h3 className="fs-1">تسجيل الدخول</h3>
              {messages}
              <form onSubmit={handleSubmit} className="inputs">
                <h4 className="mt-10">البريد الالكترونى</h4>
                <input name='email' type="email" />
                <h4 className="mt-10">كلمة المرور</h4>
                <input name='password' type="password" />
                {/* <Link to={"/user-account-1"} className="fs-1 button"> */}
                <button type="submit" className="fs-1">تسجيل الدخول</button>
                {/* </Link> */}
              </form>
              <h4 className="text-center instruct">
                بتسجيلك للدخول ، فإنك توافق على شروط <br />
                الاستخدام والبيع و الشراء و سياسة الخصوصية
              </h4>
              <div className="login">
                <Link className="color-blue f-bold" to={"/"}>
                  هل نسيت كلمة المرور؟
                </Link>
              </div>
            </div>

            {/* Footer */}
          </div>
          <div className="footer"></div>
          <div className="conditios">
            <Link className="item" to={"/"}>
              <span className="color-blue f-bold">سياسة الخصوصية</span>
              <img src="./assets/imgs/privacy-policy.png" alt="icon" />
            </Link>
            <Link className="item" to={"/"}>
              <span className="color-blue f-bold">شروط الاستخدام</span>
              <img src="./assets/imgs/contract.png" alt="icon" />
            </Link>
          </div>
          <h4 className="text-center f-bold fs-1 mt-10 mb-1">
            https://www.dox.com
          </h4>
        </div>
      </>
    );
  }
