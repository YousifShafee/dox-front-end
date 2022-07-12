import "./page11.css";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import API from "../../API";
import { NormalU, USER_URL, Add } from "../../config";

export default function Page11() {
  // const [IsSubmit, setIsSubmit] = useState(false);
  const [messages, setMessages] = useState('');
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    var { email, pass, fname, lname, phone, gender } = document.forms[0];
    var request = new FormData()
    request.append('email', email.value)
    request.append('password', pass.value)
    request.append('first_name', fname.value)
    request.append('last_name', lname.value)
    request.append('phone', phone.value)
    request.append('gender', gender.value)
    request.append('mission', NormalU)
    const response = await API.postRequest(USER_URL, Add, request)
    if (response.status === 201) {
      setMessages('تم إرسال كود التفعيل إلى البريد الإلكتروني')
      history.push({
        pathname: "/12",
        state: {user_email: email.value}
      });
      // setIsSubmit(true)
    } else if (response.status === 400) {
      setMessages(response.data.data[0])
      // setIsSubmit(true)
    } else {
      setMessages('حدث خطأ أثناء إنشاء الحساب');
      // setIsSubmit(false)
    }
  }
  return (
    <>
      <div className="auth">
        <div className="container ">
          {/* Header */}
          <Link to={"/"}>
            <div className="dox">
              D<span className="text-dark">o</span>X
            </div>
          </Link>
          {/* Auth card */}
          <div className="card w-40">
            <h3 className="fs-1">انشاء حساب</h3>
            <div>{messages}</div>
            <form onSubmit={handleSubmit} className="inputs">
              <div className="name d-flex">
                <input type="text" name="lname" placeholder="الاسم الاخير" />
                <input type="text" name="fname" placeholder="الاسم الاول" />
              </div>
              <input type="email" name="email" placeholder="البريد الالكتروني" />
              <input type="password" name="pass" placeholder="كلمة المرور" />
              <input type="password" name="rpass" placeholder="اعادة ادخال كلمة المرور" />
              <input type="tel" name="phone" placeholder="رقم الموبيل" />
              <h4 className="mt-10">الجنس</h4>
              <div className="radios ">
                <div className="radio">
                  <input type="radio" id="women" value="أنثى" name="gender" />
                  <label htmlFor="women">انثى</label>
                </div>
                <div className="radio">
                  <input type="radio" id="man" value="ذكر" name="gender" />
                  <label htmlFor="man">ذكر</label>
                </div>
              </div>
              <button type="submit" className="fs-1">متابعة</button>
            </form>
            <h4 className="text-center instruct">
              من خلال إنشاء حساب ، فإنك توافق على شروط <br />
              الاستخدام والبيع و الشراء و سياسة الخصوصية
            </h4>
            <div className="login">
              <h4 className="d-inline ">هل لديك حساب بالفعل؟</h4>
              <Link className="color-blue f-bold" to={"/13"}>
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
