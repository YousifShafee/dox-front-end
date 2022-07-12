import "./userAccount.css";
import { Link } from "react-router-dom";

// Import components
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import Chatbot from "../../components/chatbot/Chatbot";

export default function UserAccount() {
  return (
    <>
      <Navbar />
      <div className="settings user-account-1">
        <div className="container">
          <div className="box">
            <div className="texts fs-1">
              <h4>اعلاناتى</h4>
              <p className="m-0">بامكانك هنا إدارة اعلاناتك المنشورة</p>
            </div>
            <div className="btns ">
              <Link to={"/user-settings"} className="btn fs-1 second">
                الاعدادات
              </Link>
              <Link to={"/user-account-1"} className="btn fs-1 main">
                الاعلانات
              </Link>
            </div>
            <div className="body admin-settings">
              <div className="no-ads">
                <img src="./assets/imgs/star.png" alt="" />
                <p className="fs-1">لا يوجد اعلانات منشورة في الوقت الحالى</p>
                <div className="btns ">
                  <div className="add-box">
                    <button className="btn btn-add ">
                      <span className="fs-1"> اضف اعلان</span>
                      <img
                        className="add-icon"
                        src="./assets/imgs/add.png"
                        alt="add"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
      <Footer />
    </>
  );
}
