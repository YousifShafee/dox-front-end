import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import pages
import Page1 from "./pages/page1/Page1";
import Page2 from "./pages/page2/Page2";
import Page3 from "./pages/page3/Page3";
import Page4 from "./pages/page4/Page4";
import Page5 from "./pages/page5/Page5";
import Page6 from "./pages/page6/Page6";
import Page7 from "./pages/page7/Page7";
import Page8 from "./pages/page8/Page8";
import Page9 from "./pages/page9/Page9";
import Page10 from "./pages/page10/Page10";
import Page11 from "./pages/page11/Page11";
import Page12 from "./pages/page12/Page12";
import Page13 from "./pages/page13/Page13";
import Page14 from "./pages/page14/Page14";
import Page15 from "./pages/page15/Page15";
import Page16 from "./pages/page16/Page16";
import Carsalead from "./pages/carsalead/Carsalead";
import Mobilead from "./pages/mobilead/Mobilead";
import Accessoiresad from "./pages/accessoiresad/Accessoiresad";
import Carrentad from "./pages/carrentad/Carrentad";
import Properitiessalead from "./pages/properitiessalead/Properitiessalead";
import Properitiesrentad from "./pages/properitiesrentad/Properitiesrentad";
import Medicalad from "./pages/medicalad/Medicalad";
import Electronicsad from "./pages/electronicsad/Electronicsad";
import Furnituread from "./pages/furnituread/Furnituread";
import Mobileedit from "./pages/mobileedit/Mobileedit";
import Accessoiresedit from "./pages/accessoiresedit/Accessoiresedit";
import Carrentedit from "./pages/carrentedit/Carrentedit";
import Properitiessaleedit from "./pages/properitiessaleedit/Properitiessaleedit";
import Properitiesrentedit from "./pages/properitiesrentedit/Properitiesrentedit";
import Medicaledit from "./pages/medicaledit/Medicaledit";
import Electronicsedit from "./pages/electronicsedit/Electronicsedit";
import Furnitureedit from "./pages/furnitureedit/Furnitureedit";
import Carsaleedit from "./pages/carsaleedit/Carsaleedit";
import Carsaleshow from "./pages/carsaleshow/Carsaleshow";
import Carrentshow from "./pages/carrentshow/Carrentshow";
import Properitiessaleshow from "./pages/properitiessaleshow/Properitiessaleshow";
import Properitiesrentshow from "./pages/properitiesrentshow/Properitiesrentshow";
import Mobileshow from "./pages/mobileshow/Mobileshow";
import Accessoiresshow from "./pages/accessoiresshow/Accessoiresshow";
import Medicalshow from "./pages/medicalshow/Medicalshow";
import Electronicsshow from "./pages/electronicsshow/Electronicsshow";
import Furnitureshow from "./pages/furnitureshow/Furnitureshow";
import AdminsLogin from "./pages/adminsLogin/AdminsLogin";
import UserSettings from "./pages/usersSettings/UserSettings";
import Admin1Settings1 from "./pages/admin1Settings1/Admin1Settings1";
import Admin1Settings2 from "./pages/admin1Settings2/Admin1Settings2";
import Admin1Settings3 from "./pages/admin1Settings3/Admin1Settings3";
import Admin1Settings4 from "./pages/admin1Settings4/Admin1Settings4";
import Admin2Settings1 from "./pages/admin2Settings1/Admin2Settings1";
import Admin2Settings2 from "./pages/admin2Settings2/Admin2Settings2";
import Admin2Settings3 from "./pages/admin2Settings3/Admin2Settings3";
import Admin3Settings1 from "./pages/admin3Settings1/Admin3Settings1";
import Admin3Settings2 from "./pages/admin3Settings2/Admin3Settings2";
import SponsoredAd from "./pages/sponsoredAd/SponsoredAd";
import UserAccount from "./pages/userAccount/UserAccount";
import UserAccount1 from "./pages/userAccount1/UserAccount1";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Page1} />
        <Route path="/2" component={Page2} />
        <Route path="/3" component={Page3} />
        <Route path="/4" component={Page4} />
        <Route path="/5" component={Page5} />
        <Route path="/6" component={Page6} />
        <Route path="/7" component={Page7} />
        <Route path="/8" component={Page8} />
        <Route path="/9" component={Page9} />
        <Route path="/10" component={Page10} />
        <Route path="/11" component={Page11} />
        <Route path="/12" component={Page12} />
        <Route path="/13" component={Page13} />
        <Route path="/14" component={Page14} />
        <Route path="/15" component={Page15} />
        <Route path="/16" component={Page16} />

        <Route path="/21" component={Carsalead} />
        <Route path={"/22"} component={Carrentad} />
        <Route path={"/23"} component={Mobilead} />
        <Route path={"/24"} component={Accessoiresad} />
        <Route path={"/25"} component={Properitiessalead} />
        <Route path={"/26"} component={Properitiesrentad} />
        <Route path={"/27"} component={Medicalad} />
        <Route path={"/28"} component={Electronicsad} />
        <Route path={"/29"} component={Furnituread} />

        <Route path={"/100"} component={Carsaleedit} />
        <Route path={"/101"} component={Carrentedit} />
        <Route path={"/102"} component={Properitiessaleedit} />
        <Route path={"/103"} component={Properitiesrentedit} />
        <Route path={"/104"} component={Mobileedit} />
        <Route path={"/105"} component={Accessoiresedit} />
        <Route path={"/106"} component={Medicaledit} />
        <Route path={"/107"} component={Electronicsedit} />
        <Route path={"/108"} component={Furnitureedit} />

        <Route path="/200" component={Carsaleshow} />
        <Route path="/201" component={Carrentshow} />
        <Route path="/202" component={Properitiessaleshow} />
        <Route path="/203" component={Properitiesrentshow} />
        <Route path="/204" component={Mobileshow} />
        <Route path="/205" component={Accessoiresshow} />
        <Route path="/206" component={Medicalshow} />
        <Route path="/207" component={Electronicsshow} />
        <Route path="/208" component={Furnitureshow} />

        <Route path="/user-settings" component={UserSettings} />
        <Route path="/admins-login" component={AdminsLogin} />
        <Route path="/admin-1-settings-1" component={Admin1Settings1} />
        <Route path="/admin-1-settings-2" component={Admin1Settings2} />
        <Route path="/admin-1-settings-3" component={Admin1Settings3} />
        <Route path="/admin-1-settings-4" component={Admin1Settings4} />
        <Route path="/admin-2-settings-1" component={Admin2Settings1} />
        <Route path="/admin-2-settings-2" component={Admin2Settings2} />
        <Route path="/admin-2-settings-3" component={Admin2Settings3} />
        <Route path="/admin-3-settings-1" component={Admin3Settings1} />
        <Route path="/admin-3-settings-2" component={Admin3Settings2} />
        <Route path="/sponsored-ad" component={SponsoredAd} />
        <Route path="/user-account" component={UserAccount} />
        <Route path="/user-account-1" component={UserAccount1} />
      </Switch>
    </Router>
  );
}

export default App;
