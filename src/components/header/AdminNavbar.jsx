import "./header.css";
import { Link, useHistory } from "react-router-dom";
import { useLogin } from "../login/useLogin";
import { Admin, Logo, ViceD, ViceU } from "../../config";
import { useEffect, useState } from "react";
import { fetchImage } from "../../API";

export default function AdminNavbar({ page }) {
  const [logo, setLogo] = useState('')
  const { adminMission } = useLogin()
  const history = useHistory()
  const adminLogout = () => {
    sessionStorage.removeItem('adminId');
    sessionStorage.removeItem('adminEmail');
    sessionStorage.removeItem('adminMission');
    history.push('admins-login')
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
    <>
      <div className="logo-header ">
        <div className="logo-box">
        <img src={logo.img} className="logo" alt="logo" />
          <div className="dox">
            D<span className="text-light">o</span>X
          </div>
        </div>
      </div>
      <div className="btns">
        {!adminMission ? (<Link to="admins-login"><div className="btn fs-1 f-bold second">تسجيل الدخول</div></Link>) : (<></>)}
        {adminMission === Admin && (
          <>
            <div onClick={adminLogout} className="btn fs-1 f-bold second">تسجيل خروج</div>
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
          </>
        )}
        {adminMission === ViceU && (
          <>
            <div onClick={adminLogout} className="btn fs-1 f-bold second">تسجيل خروج</div>
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
          </>
        )}
        {adminMission === ViceD && (
          <>
            <div onClick={adminLogout} className="btn fs-1 f-bold second">تسجيل خروج</div>
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
          </>
        )}
      </div>
    </>
  );
}
