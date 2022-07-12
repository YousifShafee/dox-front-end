import "./page16.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import API from "../../API";
import { ChangePass, USER_URL } from "../../config";

export default function Page16() {
  const [messages, setMessages] = useState('');
  const location = useLocation()
  const handleSubmit = async (event) => {
    event.preventDefault();
    var { pass } = document.forms[0];
    var request = new FormData();
    request.append('password', pass.value)
    request.append('email', location.state.user_email)
    const response = await API.postRequest(USER_URL, ChangePass, request)
    if (response.status === 200) {
      setMessages('تم تغيير كلمة المرور بنجاح')
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
            <h3 className="fs-1">إنشاء كلمة سر جديدة</h3>
            {messages}
            <form onSubmit={handleSubmit} className="inputs">
              <h4 className="mt-10">كلمة المرور جديدة</h4>
              <input name="pass" type="password" placeholder="على الأقل 6 أحرف" />
              <h4 className="mt-10"> إعادة إدخال كلمة المرور</h4>
              <input name="rpass" type="password" />
              <button type="submit" className="fs-1">احفظ التغيرات وسجل دخولك</button>
            </form>
          </div>
          <p className="instructions">
            <span>:نصائح لكلمة سر آمنة</span>
            <br />
            <span>
              .استخدم 8 أحرف على الأقل، من الأفضل أن تستخدم تركيبة من الأرقام
              والحروف
            </span>
            <br />
            <span>.لا تستخدم نفس كلمة المرور التي استخدمتها معنا سابقاً</span>
            <br />
            <span>
              لا تستخدم كلمات القاموس أو اسمك أو عنوان بريدك الإلكتروني أو رقم
              الموبايل
              <br />
              .أو معلومات شخصية أخرى يمكن الحصول عليها بسهولة
            </span>
            <br />
            <span>.لا تستخدم نفس كلمة المرور لحسابات متعددة على الإنترنت</span>
          </p>
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
