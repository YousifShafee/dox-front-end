import "./admin2Settings1.css";
import { useState } from "react";

// Import components
import AdminNavbar from "../../components/header/AdminNavbar";
import DeleteCard from "../../components/deleteCard/DeleteCard";

import {
  Logo,
  General,
  CarF,
  Car,
  PropertyF,
  Property,
  MobileF,
  Mobile,
  AccessF,
  Access,
  MidicalF,
  Midical,
  ElectronF,
  Electron,
  FurnitureF,
  Furniture,
  AllWithoutAd,
  IMAGE_URL,
  Edit,
  ViceU,
  Admin,
  ViceD,
  Add
} from "../../config";
import { useEffect } from "react";
import API, { fetchImage } from "../../API";
import { useHistory } from "react-router-dom";
import { useLogin } from "../../components/login/useLogin";

export default function Admin2Settings1() {
  // Show & Hide sections
  const [hideUpdateLogo, setHideUpdateLogo] = useState(false);
  const [hideUpdateMain, setHideUpdateMain] = useState(false);
  const [hideUpdateFav, setHideUpdateFav] = useState(false);
  // Upload imgs
  const [background, setBackground] = useState(null);
  const [img, setImg] = useState(null);
  const [img2, setImg2] = useState(null);

  const [logo, setLogo] = useState('');
  const [general, setGeneral] = useState([])
  const [featur_car, setFeaturCar] = useState([])
  const [car, setCar] = useState([])
  const [featur_property, setFeaturProperty] = useState([])
  const [property, setProperty] = useState([])
  const [featur_mobile, setFeaturMobile] = useState([])
  const [mobile, setMobile] = useState([])
  const [featur_access, setFeaturAccess] = useState([])
  const [access, setAccess] = useState([])
  const [featur_midical, setFeaturMidical] = useState([])
  const [midical, setMidical] = useState([])
  const [featur_electron, setFeaturElectron] = useState([])
  const [electron, setElectron] = useState([])
  const [featur_furniture, setFeaturFurniture] = useState([])
  const [furniture, setFurniture] = useState([])
  const { userId } = useLogin()
  const history = useHistory()

  const updateLogo = async (img, pk) => {
    var request = new FormData()
    request.append('images', img)
    const response = await API.editRequest(IMAGE_URL, pk, Edit, request)
    setLogo({
      img: response.data.images,
      id: response.data.id,
      category: response.data.category
    })
  }

  const updateGeneral = async (image) => {
    var request = new FormData()
    request.append('images', image)
    request.append('user', userId)
    request.append('is_active', true)
    request.append('category', General)
    const response = await API.postRequest(IMAGE_URL, Add, request)
    setGeneral(oldArray => [
      ...oldArray,
      {
        img: response.data.images,
        id: response.data.id,
        category: response.data.category
      }
    ])
  }

  useEffect(() => {
    let redirect_url = "admins-login"
    const mission = sessionStorage.getItem('adminMission')
    if (mission !== ViceU) {
      if (mission === Admin) {
        redirect_url = 'admin-1-settings-1'
      } else if (mission === ViceD) {
        redirect_url = 'admin-3-settings-1'
      }
      history.push(redirect_url)
      return
    }
    async function setImages() {
      await fetchImage(AllWithoutAd)
        .then(response => {
          response.map(item => {
            if (item.category === Logo) {
              setLogo(item)
            }
            else if (item.category === General) {
              setGeneral(oldArray => [...oldArray, item])
            } else if (item.category === CarF) {
              setFeaturCar(oldArray => [...oldArray, item])
            } else if (item.category === Car) {
              setCar(oldArray => [...oldArray, item])
            } else if (item.category === PropertyF) {
              setFeaturProperty(oldArray => [...oldArray, item])
            } else if (item.category === Property) {
              setProperty(oldArray => [...oldArray, item])
            } else if (item.category === MobileF) {
              setFeaturMobile(oldArray => [...oldArray, item])
            } else if (item.category === Mobile) {
              setMobile(oldArray => [...oldArray, item])
            } else if (item.category === AccessF) {
              setFeaturAccess(oldArray => [...oldArray, item])
            } else if (item.category === Access) {
              setAccess(oldArray => [...oldArray, item])
            } else if (item.category === MidicalF) {
              setFeaturMidical(oldArray => [...oldArray, item])
            } else if (item.category === Midical) {
              setMidical(oldArray => [...oldArray, item])
            } else if (item.category === ElectronF) {
              setFeaturElectron(oldArray => [...oldArray, item])
            } else if (item.category === Electron) {
              setElectron(oldArray => [...oldArray, item])
            } else if (item.category === FurnitureF) {
              setFeaturFurniture(oldArray => [...oldArray, item])
            } else if (item.category === Furniture) {
              setFurniture(oldArray => [...oldArray, item])
            }
          })
        })
    }
    async function fetchLogo() {
      await fetchImage(Logo)
        .then(response => {
          setLogo(response[0])
        })
    }
    fetchLogo()
    setImages()
  }, [history])
  return (
    <>
      <div className="admin-settings">
        <AdminNavbar page={"update"} />

        <div className="fill-container">
          <div className="box">
            <div className="body">
              {/* Logo and background update */}
              <div
                className="header fs-1"
                onClick={() => setHideUpdateLogo(!hideUpdateLogo)}
              >
                <img src="./assets/imgs/chevron-down.png" alt="chevron-down" />
                <span>تحديث اللوجو و خلفية الموقع</span>
              </div>
              {!hideUpdateLogo && (
                <div className="admin-settings-cards grid-4  d-rtl">
                  <div className="card">
                    <div className="update-logo-box">
                      <div className="logo-header ">
                        <div className="logo-box">
                          {logo ? (
                            <img
                              src={logo.img}
                              alt="img"
                              className="img-obj"
                            />
                          ) : (
                            <>
                              <img src={logo.img} className="logo" alt="logo" />
                              <div className="dox">
                                D<span className="text-light">o</span>X
                              </div>
                            </>
                          )}
                        </div>

                        <label className="img-box" htmlFor="logo">
                          <input
                            id="logo"
                            type="file"
                            accept="image/*"
                            
                            hidden
                          />
                          <img
                            src="./assets/imgs/add-image.png"
                            alt="add img"
                            className="add-img"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="btns">
                      <button onClick={(e) => { updateLogo(e.target.files[0], logo.id) }} className="btn fs-1 custom-main">احفظ</button>
                    </div>
                  </div>
                  {general.map((image) => (
                    <DeleteCard img={image.img} img_id={image.id} />
                  ))}
                  <label htmlFor="background">
                    <input
                      id="background"
                      type="file"
                      accept="image/*"
                      onChange={(e) => updateGeneral(e.target.files[0])}
                      hidden
                    />
                    {background ? (
                      <img
                        src={URL.createObjectURL(background)}
                        alt="img"
                        className="img-url"
                      />
                    ) : (
                      <img
                        src="./assets/imgs/add-image-2x.png"
                        alt="add img"
                        className="dirct-img"
                      />
                    )}
                  </label>
                </div>
              )}
              {/*  Main companies update*/}
              <div
                className="header fs-1"
                onClick={() => setHideUpdateMain(!hideUpdateMain)}
              >
                <img src="./assets/imgs/chevron-down.png" alt="chevron-down" />
                <span>تحديث الصفحات الرئيسية للشركات</span>
              </div>
              {!hideUpdateMain && (
                <div className="admin-settings-cards grid-4 d-rtl">
                  {car.map((c) => (
                    <DeleteCard img_id={c.id} img={c.img} />
                  ))}
                  {property.map((c) => (
                    <DeleteCard img_id={c.id} img={c.img} />
                  ))}
                  {mobile.map((c) => (
                    <DeleteCard img_id={c.id} img={c.img} />
                  ))}
                  {access.map((c) => (
                    <DeleteCard img_id={c.id} img={c.img} />
                  ))}
                  {midical.map((c) => (
                    <DeleteCard img_id={c.id} img={c.img} />
                  ))}
                  {electron.map((c) => (
                    <DeleteCard img_id={c.id} img={c.img} />
                  ))}
                  {furniture.map((c) => (
                    <DeleteCard img_id={c.id} img={c.img} />
                  ))}
                  <label htmlFor="img">
                    <input
                      id="img"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImg(e.target.files[0])}
                      hidden
                    />
                    {img ? (
                      <img
                        src={URL.createObjectURL(img)}
                        alt="img"
                        className="img-url"
                      />
                    ) : (
                      <img
                        src="./assets/imgs/add-image-2x.png"
                        alt="add img"
                        className="dirct-img"
                      />
                    )}
                  </label>
                </div>
              )}
              {/*  Fav companies update*/}
              <div
                className="header fs-1"
                onClick={() => setHideUpdateFav(!hideUpdateFav)}
              >
                <img src="./assets/imgs/chevron-down.png" alt="chevron-down" />
                <span>تحديث الشركات المميزة</span>
              </div>
              {!hideUpdateFav && (
                <>
                  <div className="admin-settings-cards">
                    {/* cars */}
                    <span className="fs-1">سيارات</span>
                    <div className="grid-4 d-rtl">
                      {featur_car.map(
                        (c) =>
                          <DeleteCard img_id={c.id} img={c.img} />
                      )}
                    </div>
                    {/* property */}
                    <span className="fs-1">عقارات</span>
                    <div className="grid-4 d-rtl">
                      {featur_property.map(
                        (c) =>
                          <DeleteCard img_id={c.id} img={c.img} />
                      )}
                    </div>
                    {/* mobiles */}
                    <span className="fs-1">موبايلات</span>
                    <div className="grid-4 d-rtl">
                      {featur_mobile.map(
                        (c) =>
                          <DeleteCard img_id={c.id} img={c.img} />
                      )}
                    </div>
                    {/* accessories */}
                    <span className="fs-1">اكسسوارات</span>
                    <div className="grid-4 d-rtl">
                      {featur_access.map(
                        (c) =>
                          <DeleteCard img_id={c.id} img={c.img} />
                      )}
                    </div>
                    {/* medical supplies */}
                    <span className="fs-1">مستلزمات طبية</span>
                    <div className="grid-4 d-rtl">
                      {featur_midical.map(
                        (c) =>
                          <DeleteCard img_id={c.id} img={c.img} />
                      )}
                    </div>
                    {/* electronics & home appliances */}
                    <span className="fs-1">الكترونيات وأجهزة منزلية</span>
                    <div className="grid-4 d-rtl">
                      {featur_electron.map(
                        (c) =>
                          <DeleteCard img_id={c.id} img={c.img} />
                      )}
                    </div>
                    {/* home furniture - decor */}
                    <span className="fs-1">اثاث منزلى - ديكور</span>
                    <div className="grid-4 d-rtl">
                      {featur_furniture.map(
                        (c) =>
                          <DeleteCard img_id={c.id} img={c.img} />
                      )}
                      <label htmlFor="img2">
                        <input
                          id="img2"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImg2(e.target.files[0])}
                          hidden
                        />
                        {img2 ? (
                          <img
                            src={URL.createObjectURL(img2)}
                            alt="img"
                            className="img-url"
                          />
                        ) : (
                          <img
                            src="./assets/imgs/add-image-2x.png"
                            alt="add img"
                            className="dirct-img"
                          />
                        )}
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
