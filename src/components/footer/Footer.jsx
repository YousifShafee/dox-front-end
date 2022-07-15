import "./footer.css";
import { useEffect, useState } from "react";
import { fetchImage } from "../../API";
import { Logo } from "../../config";

export default function Footer() {
  const [logo, setLogo] = useState('')
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
    <div className="footer">
      <div className="container">
        <div className="logo-box">
        <img src={logo.img} className="logo" alt="logo" />
          <div className="dox">
            D<span className="text-light">o</span>X
          </div>
        </div>

        <div className="social fs-1">
          <div className="list">
            <ul>
              <li>
                <h4>تواصل معنا</h4>
              </li>
              <li>
                <div className="data">
                  <span>واتس اب</span>
                  <img
                    src="./assets/imgs/whatsapp.png"
                    alt="icon"
                    className="icon"
                  />
                </div>
              </li>
              <li>
                <div className="data">
                  <span>خدمة العملاء</span>
                  <img
                    src="./assets/imgs/phone.png"
                    alt="icon"
                    className="icon"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className="list">
            <ul>
              <li>
                <h4>تابعونا على</h4>
              </li>
              <li>
                <div className="data">
                  <span>فيسبوك</span>
                  <img
                    src="./assets/imgs/facebook.png"
                    alt="icon"
                    className="icon"
                  />
                </div>
              </li>
              <li>
                <div className="data">
                  <span>تويتر</span>
                  <img
                    src="./assets/imgs/twitter_1.png"
                    alt="icon"
                    className="icon"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className="list">
            <ul>
              <li>
                <h4>تعرف علينا</h4>
              </li>
              <li>
                <div className="data">
                  <span>شروط الاستخدام</span>
                  <img
                    src="./assets/imgs/contract.png"
                    alt="icon"
                    className="icon"
                  />
                </div>
              </li>
              <li>
                <div className="data">
                  <span>سياسة خاصة</span>
                  <img
                    src="./assets/imgs/privacy-policy.png"
                    alt="icon"
                    className="icon"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
