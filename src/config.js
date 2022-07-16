import { useHistory } from "react-router-dom";

// API URLS
const CAR_RENT_URL = 'car/rent/';
const CAR_SALES_URL = 'car/sales/';
const ACCESS_URL = 'access/';
const ELECTRONIC_URL = 'electronic/';
const FURNITURE_URL = 'furniture/';
const MEDICAL_URL = 'medical/';
const MOBILE_URL = 'mobile/';
const USER_URL = 'user/';
const IMAGE_URL = 'image/';
const AD_URL = 'ad/';
const PROPERTIES_SALES_URL = 'properties/sales/';
const PROPERTIES_RENT_URL = 'properties/rent/';

// Images Categories
const AllWithoutAd = "without-ad"
const AllWithoutAdLogoGeneral = "without-ad-logo-general"
const Logo = "logo"
const General = "general"
const CarF = "featur_car"
const Car = "car"
const PropertyF = "featur_property"
const Property = "property"
const MobileF = "featur_mobile"
const Mobile = "mobile"
const AccessF = "featur_access"
const Access = "access"
const MidicalF = "featur_midical"
const Midical = "midical"
const ElectronF = "featur_electron"
const Electron = "electron"
const FurnitureF = "featur_furniture"
const Furniture = "furniture"

// Users Type
const ViceD = 'Delete'
const ViceU = 'Update'
const Admin = 'Admin'
const NormalU = 'Normal'

// User Action URL
const Login = 'login/'
const Logout = 'logout/'
const ConfirmAccount = 'confirm_account/'
const SendCode = 'send_code/'
const ChangePass = 'change_pass/'

// General Request Action
const Add = "add/"
const Edit = "edit/"
const Delete = "delete/"
const Search = "search/"

// Ad action
const EmailAd = "ad/email/"         // get ads for specific account

// Image action
const Active = "active/"            // to active slider image and fetuere company image

const adNavigate = (card) => {
    const navigate_show = {
        car_sales: "200",
        car_rent: "201",
        property_sales: "202",
        property_rent: "203",
        mobile: "204",
        access: "205",
        midical: "206",
        electron: "207",
        furniture: "208",
    }
    return {
        pathname: navigate_show[card.type],
        state: { ad_id: card.product_id },
    }
}

export {
    adNavigate,
    AllWithoutAdLogoGeneral,
    Search,
    EmailAd,
    Active,
    AllWithoutAd,
    Logo,
    Add,
    Edit,
    Delete,
    ChangePass,
    CAR_RENT_URL,
    CAR_SALES_URL,
    ACCESS_URL,
    ELECTRONIC_URL,
    FURNITURE_URL,
    AD_URL,
    MEDICAL_URL,
    MOBILE_URL,
    USER_URL,
    IMAGE_URL,
    PROPERTIES_SALES_URL,
    PROPERTIES_RENT_URL,
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
    ViceD,
    ViceU,
    Admin,
    NormalU,
    Login,
    Logout,
    ConfirmAccount,
    SendCode,
};