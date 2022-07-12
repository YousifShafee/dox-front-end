import "./page15.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import API from "../../API";
import { ConfirmAccount, USER_URL } from "../../config";

export default function Page15() {
  const [messages, setMessages] = useState('');
  const location = useLocation()
  const history = useHistory()
  const handleSubmit = async (event) => {
    event.preventDefault();
    var { code } = document.forms[0];
    var request = new FormData()
    request.append('code', code.value)
    request.append('email', location.state.user_email)
    const response = await API.postRequest(USER_URL, ConfirmAccount, request)
    if (response.status === 200) {
      setMessages('تم التحقق بنجاح')
      history.push({
        pathname: "/16",
        state: {user_email: location.state.user_email}
      });
    } else if (response.status === 400) {
      setMessages(response.data.data[0])
      // setIsSubmit(true)
    } else {
      setMessages('حدث خطأ أثناء التحقق')
    }
  }
  return (
    <>
      <div className="auth auth-pass">
        <div className="container ">
          {/* Header */}
          <Link to={"/"}>
            <div className="dox">
              D<span className="text-dark">o</span>X
            </div>
          </Link>
          {/* Auth card */}
          <div className="card w-40">
            <h3 className="fs-1">التحقق من البريد الالكترونى</h3>
            {messages}
            <p className="fs-1">
              للتحقق من البريد الالكترونى قمنا بارسال
              <br />
              كلمة مرور لمرة واحدة الى بريدك
            </p>
            <form onSubmit={handleSubmit} className="inputs">
              <h4 className="mt-10">ادخال كلمة المرور لمرة واحدة</h4>
              <input name="code" type="password" />
              <button type="submit" className="fs-1">متابعة</button>
            </form>
            <h4 className="text-center instruct color-blue ">
              اعادة ارسال كلمة المرور لمرة واحدة
            </h4>
            <div className="login">
              <h4 className="d-inline ">هل لديك حساب بالفعل؟</h4>
              <Link className="color-blue f-bold" to={"/"}>
                تسجيل الدخول
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
