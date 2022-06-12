import "./page14.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import API from "../../API";
import { SendCode, USER_URL } from "../../config";

export default function Page14() {
  const [messages, setMessages] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    var { email } = document.forms[0];
    var request = new FormData();
    request.append('email', email.value)
    const response = await API.postRequest(USER_URL, SendCode, request)
    if (response.status === 200) {
      setMessages('تم إرسال كود التفعيل إلى البريد الإلكتروني')
    } else if (response.status === 404) {
      setMessages('هذا البريد غير موجود')
    } else if (response.status === 400) {
      setMessages(response.data.data[0])
      // setIsSubmit(true)
    } else {
      setMessages('حدث خطأ أثناء تسجيل الدخول')
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
            <h3 className="fs-1">المساعدة الخاصة بكلمة المرور</h3>
            {messages}
            <p className="fs-1">
              يُرجى إدخال رقم الموبيل
              <br />
              المقترن بحسابك في دوكس
            </p>
            <form onSubmit={handleSubmit} className="inputs">
              <h4 className="mt-10">البريد الالكترونى</h4>
              <input name='email' type="email" />
              <button type="submit" className="fs-1">متابعة</button>
            </form>
            <div className="text-center instruct color-blue "></div>
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
