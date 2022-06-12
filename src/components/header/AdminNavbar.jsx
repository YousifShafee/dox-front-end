import "./header.css";
import { Link } from "react-router-dom";

export default function AdminNavbar({ page, admin1, admin2, admin3 }) {
  return (
    <>
      <div className="logo-header ">
        <div className="logo-box">
          <img src="./assets/imgs/logo.png" className="logo" alt="logo" />
          <div className="dox">
            D<span className="text-light">o</span>X
          </div>
        </div>
      </div>
      {admin1 && (
        <div className="btns">
          <Link
            to={"/admin-1-settings-2"}
            className={
              "btn fs-1 f-bold second " + (page === "sponsoredAd" ? "main" : "")
            }
          >
            <span>اعلان ممول</span>
          </Link>
          <Link
            to={"/admin-1-settings-3"}
            className={
              "btn fs-1 f-bold second " + (page === "settings" ? "main" : "")
            }
          >
            <span>الاعدادات</span>
          </Link>
          <Link
            to={"/admin-1-settings-4"}
            className={
              "btn fs-1 f-bold second " + (page === "delete" ? "main" : "")
            }
          >
            <span>حذف اعلان</span>
          </Link>
          <button
            className={
              "btn fs-1 f-bold second " + (page === "update" ? "main" : "")
            }
          >
            <Link to={"/admin-1-settings-1"}>
              <span>تحديث</span>
            </Link>
          </button>
        </div>
      )}
      {admin2 && (
        <div className="btns">
          <Link
            to={"/admin-2-settings-2"}
            className={
              "btn fs-1 f-bold second " + (page === "sponsoredAd" ? "main" : "")
            }
          >
            <span>اعلان ممول</span>
          </Link>
          <Link
            to={"/admin-2-settings-3"}
            className={
              "btn fs-1 f-bold second " + (page === "settings" ? "main" : "")
            }
          >
            <span>الاعدادات</span>
          </Link>
          <button
            className={
              "btn fs-1 f-bold second " + (page === "update" ? "main" : "")
            }
          >
            <Link to={"/admin-2-settings-1"}>
              <span>تحديث</span>
            </Link>
          </button>
        </div>
      )}
      {admin3 && (
        <div className="btns">
          <Link
            to={"/admin-3-settings-2"}
            className={
              "btn fs-1 f-bold second " + (page === "settings" ? "main" : "")
            }
          >
            <span>الاعدادات</span>
          </Link>
          <Link
            to={"/admin-3-settings-1"}
            className={
              "btn fs-1 f-bold second " + (page === "delete" ? "main" : "")
            }
          >
            <span>حذف اعلان</span>
          </Link>
        </div>
      )}
    </>
  );
}
