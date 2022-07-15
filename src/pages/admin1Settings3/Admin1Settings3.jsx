import "./admin1Settings3.css";
import { useState } from "react";

// Import components
import AdminNavbar from "../../components/header/AdminNavbar";
import { Add, Admin, Edit, NormalU, Search, USER_URL, ViceD, ViceU } from "../../config";
import API, { fetchSearchField } from "../../API";
import { useEffect } from "react";
import { useLogin } from "../../components/login/useLogin";
import { useHistory } from "react-router-dom";

export default function Admin1Settings3() {
  // Show & Hide sections
  const history = useHistory()
  const [hideAddAdmin, setHideAddAdmin] = useState(false);
  const [hideUpdatePass, setHideUpdatePass] = useState(false);
  const [hideDeleteAdmin, setHideDeleteAdmin] = useState(false);
  const [hideDeleteUser, setHideDeleteUser] = useState(false);
  const {adminId} = useLogin()
  const [messages, setMessages] = useState('');
  const [viceUser, setViceUser] = useState([]);
  const [normalUser, setNormalUser] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    var { email, pass, fname, lname, phone, gender, mission } = document.forms[0];
    var request = new FormData()
    request.append('email', email.value)
    request.append('password', pass.value)
    request.append('first_name', fname.value)
    request.append('last_name', lname.value)
    request.append('phone', phone.value)
    request.append('gender', gender.value)
    request.append('mission', mission.value)
    const response = await API.postRequest(USER_URL, Add, request)
    if (response.status === 201) {
      setMessages('تم إنشاء الحساب بنجاح')
    } else if (response.status === 400) {
      setMessages(response.data.data[0])
    } else {
      setMessages('حدث خطأ أثناء إنشاء الحساب');
    }
  }

  const deleteUser = async (user_id) => {
    await API.deleteRequest(USER_URL, user_id)
  }

  const passSubmit = async (event) => {
    event.preventDefault();
    var { npass, rpass } = document.forms[1];
    if (npass.value !== rpass.value) {
      setMessages('كلمة السر المرور الجديدة غير متطابقة')
      return
    }
    var request = new FormData()
    request.append('password', npass.value)
    const response = await API.postRequest(USER_URL + adminId + '/', Edit, request)
    if (response.status === 200) {
      setMessages('تم تغيير البيانات بنجاح')
    } else if (response.status === 400) {
      setMessages(response.data.data[0])
      // setIsSubmit(true)
    } else {
      setMessages('حدث خطأ أثناء تغيير البيانات')
    }
  }

  const searchAd = async (event) => {
    event.preventDefault();
    var { username } = document.forms[2];
    var request = new FormData();
    request.append('first_name', username.value)
    request.append('last_name', username.value)
    let ads = []
    await API.postRequest(USER_URL, Search, request)
      .then(response => {
        ads = response.data.map(item => item)
      })
      .catch(e => console.error(e))    
    setNormalUser(ads.map(item => {
      if (item.mission === NormalU) {
        return setItem(item)
      }
    }))
  }

  const setItem = (item) => {
    return <tr>
      <td>
        <div className="btns">
          <div className="delete-card">
            <button onClick={() => deleteUser(item.id)} className="btn fs-1">
              حذف
              <img
                src="./assets/imgs/delete.png"
                alt="delete icon"
              />
            </button>
          </div>
        </div>
      </td>
      <td></td>
      <td></td>
      <td>{item.phone}</td>
      <td>{item.first_name + " " + item.last_name}</td>
    </tr>
  }

  const getNormalUser = async () => {
    await API.getAll(USER_URL)
      .then(response => {
        response.map(item => {
          if (item.mission === NormalU) {
            setNormalUser(oldArray => [...oldArray, setItem(item)])
          } else if (item.mission === ViceD || item.mission === ViceU) {
            setViceUser(oldArray => [...oldArray, setItem(item)])
          }
        })
      })
  }

  useEffect(() => {
    let redirect_url = "admins-login"
    const mission = sessionStorage.getItem('adminMission')
    if (mission !== Admin) {
      if (mission === ViceU) {
        redirect_url = 'admin-2-settings-1'
      } else if (mission === ViceD) {
        redirect_url = 'admin-3-settings-1'
      }
      history.push(redirect_url)
      return
    }    
    getNormalUser()
  }, [history])
  return (
    <>
      <div className="admin-settings">
        <AdminNavbar page={"settings"} />
        <div className="fill-container">
          <div className="box">
            <div className="body">
              {/* Add admin */}
              {messages}
              <div
                className="header fs-1"
                onClick={() => setHideAddAdmin(!hideAddAdmin)}
              >
                <img src="./assets/imgs/chevron-down.png" alt="chevron-down" />
                <span>إضافة مشرف</span>
              </div>
              {!hideAddAdmin && (
                <div className="admin-settings-cards auth ">
                  {/* Auth card */}
                  <form onSubmit={handleSubmit} className="card w-40">
                    <div className="inputs">
                      <div className="name d-flex">
                        <input type="text" name="fname" placeholder="First Name" />
                        <input type="text" name="lname" placeholder="Last Name" />
                      </div>
                      <input type="email" name="email" placeholder="Email" />
                      <input type="tel" name="phone" placeholder="Phone Number" />
                      <input type="password" name="pass" placeholder="Password" />
                      <input type="password" name="rpass" placeholder="Confirm Password" />
                      <h4 className="mt-10">Gender ?</h4>
                      <div className="radios ">
                        <div className="radio">
                          <input
                            type="radio"
                            id="male"
                            value="ذكر"
                            name="gender"
                          />
                          <label for="women">Male</label>
                        </div>
                        <div className="radio">
                          <input
                            type="radio"
                            id="female"
                            value="أنثى"
                            name="gender"
                          />
                          <label for="female">Female</label>
                        </div>
                      </div>
                      <h4 className="mt-10">Mission ?</h4>
                      <div className="radios ">
                        <div className="radio">
                          <input
                            type="radio"
                            id="update"
                            value="Update"
                            name="mission"
                          />
                          <label for="update">Update</label>
                        </div>
                        <div className="radio">
                          <input
                            type="radio"
                            id="delete"
                            value="Delete"
                            name="mission"
                          />
                          <label for="delete">Delete</label>
                        </div>
                      </div>
                      <div className="auth-add">
                        <button type="submit" className="fs-1 text-light">Add</button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              {/* Update password */}
              <div
                className="header fs-1"
                onClick={() => setHideUpdatePass(!hideUpdatePass)}
              >
                <img src="./assets/imgs/chevron-down.png" alt="chevron-down" />
                <span>تغيير كلمة السر</span>
              </div>
              {!hideUpdatePass && (
                <div className="settings">
                  <form onSubmit={passSubmit} className="settings-inputs">
                    <input
                      type="password"
                      name="npass"
                      placeholder="كلمة السر الجديدة"
                      className="fs-1"
                    />
                    <input
                      type="password"
                      name="rpass"
                      placeholder="إعادة كلمة السر الجديدة"
                      className="fs-1"
                    />
                    <div className="btns">
                      <button type="submit" className="btn fs-1 main">احفظ</button>
                    </div>
                  </form>
                </div>
              )}
              {/* Delete admin */}
              <div
                className="header fs-1"
                onClick={() => setHideDeleteAdmin(!hideDeleteAdmin)}
              >
                <img src="./assets/imgs/chevron-down.png" alt="chevron-down" />
                <span>حذف مشرف</span>
              </div>
              {!hideDeleteAdmin && (
                <div className="table-box delete-admin">
                  <table className="styled-table fs-1">
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="color-main">رقم الموبيل</td>
                        <td className="color-main">اسم المشرف</td>
                      </tr>
                      {viceUser}
                    </tbody>
                  </table>
                </div>
              )}
              {/* Delete user */}
              <div
                className="header fs-1 mt-2"
                onClick={() => setHideDeleteUser(!hideDeleteUser)}
              >
                <img src="./assets/imgs/chevron-down.png" alt="chevron-down" />
                <span>حذف مستخدم</span>
              </div>
              {!hideDeleteUser && (
                <div className="delete-user">
                  <form onSubmit={searchAd} className="title-input">
                    <div className="search-input ">
                      <input
                        type="text"
                        name="username"
                        placeholder="اسم المستخدم"
                        className="fs-1"
                      />
                      <img src="./assets/imgs/search.png" alt="search" />
                    </div>
                  </form>
                  <div className="table-box">
                    <table className="styled-table fs-1">
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td className="color-main">رقم الموبيل</td>
                          <td className="color-main">اسم المستخدم</td>
                        </tr>
                        {normalUser}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
