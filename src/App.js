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
import Page17 from "./pages/page17/Page17";
import Page18 from "./pages/page18/Page18";
import Page19 from "./pages/page19/Page19";
import Page20 from "./pages/page20/Page20";
import Page21 from "./pages/page21/Page21";
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
        <Route path="/" exact component={Page1} />          {/* main page */}
        <Route path="/2" component={Page2} />               {/* car sales page */}
        <Route path="/3" component={Page3} />               {/* car rent page */}
        <Route path="/4" component={Page4} />               {/* Property sales page */}
        <Route path="/5" component={Page5} />               {/* Property rent page */}
        <Route path="/6" component={Page6} />               {/* Mobile page */}
        <Route path="/7" component={Page7} />               {/* Access page */}
        <Route path="/8" component={Page8} />               {/* Midical page */}
        <Route path="/9" component={Page9} />               {/* Electronic page */}
        <Route path="/10" component={Page10} />             {/* Furniture page */}
        <Route path="/11" component={Page11} />               {/* sign up normal user page */}
        <Route path="/12" component={Page12} />               {/* email confirm page */}
        <Route path="/13" component={Page13} />               {/* login normal user page */}
        <Route path="/14" component={Page14} />               {/* change password by email page */}
        <Route path="/15" component={Page15} />               {/* change password confirm email */}
        <Route path="/16" component={Page16} />               {/* change password */}
        <Route path="/17" component={Page17} />               {/* Ad page */}
        <Route path="/18" component={Page18} />               {/* Edit Ad page */}
        <Route path="/19" component={Page19} />               {/* Add Ad page */}
        <Route path="/20" component={Page20} />               {/* Ad Details page */}
        <Route path="/21" component={Page21} />               {/* Ad Details page */}
        <Route path="/user-settings" component={UserSettings} />                  {/* edit user profile page */}
        <Route path="/admins-login" component={AdminsLogin} />                    {/* admin login page */}
        <Route path="/admin-1-settings-1" component={Admin1Settings1} />          {/* Admin update & delete images for all main pages */}
        <Route path="/admin-1-settings-2" component={Admin1Settings2} />          {/* Admin add & delete ads page (review ads) */}
        <Route path="/admin-1-settings-3" component={Admin1Settings3} />          {/* Admin setting page for (add vice) (change admin pass) (delete vice) (delete user) */}
        <Route path="/admin-1-settings-4" component={Admin1Settings4} />          {/* Admin update images for all main pages */}
        <Route path="/admin-2-settings-1" component={Admin2Settings1} />          {/* Vice update & delete images for all main pages */}
        <Route path="/admin-2-settings-2" component={Admin2Settings2} />          {/* Vice add & delete ads page (review ads) */}
        <Route path="/admin-2-settings-3" component={Admin2Settings3} />          {/* Vice change password */}
        <Route path="/admin-3-settings-1" component={Admin3Settings1} />          {/* Vice only delete ads page (review ads) */}
        <Route path="/admin-3-settings-2" component={Admin3Settings2} />          {/* Vice change password */}
        <Route path="/sponsored-ad" component={SponsoredAd} />               {/* User add ad page */}
        <Route path="/user-account" component={UserAccount} />                {/* get User ads */}
        <Route path="/user-account-1" component={UserAccount1} />           {/* duplicate of user-account */}
      </Switch>
    </Router>
  );
}

export default App;
