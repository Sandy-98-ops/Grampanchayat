import './App.css';
import GuestLayout from './component/GuestLayout/GuestLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import AdminLayout from './component/adminLayout/AdminLayout';
import { Route, Routes } from 'react-router-dom';
import Home from './component/GuestLayout/Home';
import SignUp from './component/GuestLayout/SignUp';
import Login from './component/GuestLayout/Login';
import Notifications from './component/adminLayout/Notifications';
import Services from './component/adminLayout/Services';
import ViewApplications from './component/adminLayout/ViewApplications';
import StaffLayout from './component/StaffLayout/StaffLayout';
import ViewServices from './component/StaffLayout/ViewServices';
import AdminMaster from './component/adminLayout/AdminMaster';
import TrackingApplication from './component/adminLayout/TrackingApplication';
import About from './component/GuestLayout/About';
import AdminLogIn from './component/GuestLayout/AdminLogIn';
import AddCircleOfficer from './component/adminLayout/AddCircleOfficer';
import TalathiLayout from './component/talathiLayout/TalathiLayout';
import TalathiLogIn from './component/GuestLayout/TalathiLogIn';
import StaffLogIn from './component/GuestLayout/StaffLogIn';
import CitizenLayout from './component/citizenLayout/CitizenLayout';
import IncomeStep1 from './component/citizenLayout/IncomeStep1';
import IncomeStep2 from './component/citizenLayout/IncomeStep2';
import AddSchema from './component/adminLayout/AddSchema';
import IncomeStep3 from './component/citizenLayout/IncomeStep3';
import StaffViewApplications from './component/StaffLayout/StaffViewApplications';
import TalathiViewApplications from './component/talathiLayout/TalathiViewApplications';
import AllSchemes from './component/GuestLayout/AllSchemes';
import ViewCircleOfficers from './component/adminLayout/ViewCircleOfficers';
import ViewSchems from './component/adminLayout/ViewSchems';
import CircleOfficerLogin from './component/GuestLayout/CircleOfficerLogin';
import AdminForgotPassword from './component/adminLayout/AdminForgotPassword';
import CitizenForgotPassword from './component/citizenLayout/CitizenForgotPassword';
import StaffForgotPassword from './component/StaffLayout/StaffForgotPassword';
import CircleOfficerLayout from './component/CircleOfficerLayout/CircleOfficerLayout';
import CircleOfficerForgotPassword from './component/CircleOfficerLayout/CircleOfficerForgotPassword';
import AddTalathi from './component/CircleOfficerLayout/AddTalathi';
import AddStaff from './component/CircleOfficerLayout/AddStaff';
import ViewTalathis from './component/CircleOfficerLayout/ViewTalathis';
import ViewStaff from './component/CircleOfficerLayout/ViewStaff';
import CircleViewApplication from './component/CircleOfficerLayout/CircleViewApplication';
import AdminRegistration from './component/adminLayout/AdminRegistration';
import ApplicationStatus from './component/citizenLayout/ApplicationStatus';
import CitizenEditProfile from './component/citizenLayout/CitizenEditProfile';
import CitizenChangePassword from './component/citizenLayout/CitizenChangePassword';


function App() {
  return (
    <div className="App">

      
      <Routes>
        <Route path='/' element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/guestLayout/Login' element={<Login />}></Route>
          <Route path='/guestLayout/adminlogin' element={<AdminLogIn />}></Route>
          <Route path='/guestLayout/staffLogin' element={<StaffLogIn />}></Route>
          <Route path='/guestLayout/talathiLogin' element={<TalathiLogIn />}></Route>
          <Route path='/guestLayout/circleOfficerLogin' element={<CircleOfficerLogin />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/schemes' element={<AllSchemes />}></Route>
          <Route path='/circleOfficerForgotPassword' element={<CircleOfficerForgotPassword />}></Route>
          <Route path='/adminForgotPassword' element={<AdminForgotPassword />}></Route>
          <Route path='/citizenForgotPassword' element={<CitizenForgotPassword />}></Route>
          <Route path='/staffForgotPassword' element={<StaffForgotPassword />}></Route>
          <Route path='/talathiForgotPassword' element={<StaffForgotPassword />}></Route>
          <Route path='/adminRegistration' element={<AdminRegistration />} />

        </Route>


        <Route path='/admin' element={<AdminLayout />}>
          <Route path='/admin/notifications' element={<Notifications />}></Route>
          <Route path='/admin/services' element={<Services />} ></Route>
          <Route path='/admin/circleofficer' element={<AddCircleOfficer />}></Route>
          <Route path='/admin/viewCircleOfficers' element={<ViewCircleOfficers />} />
          <Route path='/admin/viewSchemes' element={<ViewSchems />} />
          <Route path='/admin/view' element={<ViewApplications />}></Route>
          <Route path='/admin/adminmaster' element={<AdminMaster />}></Route>
          <Route path='/admin/tracking' element={<TrackingApplication />}></Route>
          <Route path='/admin/scheme' element={<AddSchema />}></Route>
        </Route>

        <Route path='/citizen' element={<CitizenLayout />}>
          <Route index element={<IncomeStep1 />}></Route>
          <Route path='/citizen/step1' element={<IncomeStep1 />}></Route>
          <Route path='/citizen/step2' element={<IncomeStep2 />}></Route>
          <Route path='/citizen/step3' element={<IncomeStep3 />}></Route>
          <Route path='/citizen/view' element={<ApplicationStatus />} />
          <Route path='/citizen/edit-profile' element={<CitizenEditProfile />} />
          <Route path='/citizen/change-password' element={<CitizenChangePassword />} />
        </Route>

        <Route path='/staff' element={<StaffLayout />}>
          <Route path='/staff/viewservices' element={<ViewServices />}></Route>
          <Route path='/staff/view' element={<StaffViewApplications />} />
        </Route>

        <Route path='/talathi' element={<TalathiLayout />}>
          <Route path='/talathi/view' element={<TalathiViewApplications />} />
        </Route>

        <Route path='/circle' element={<CircleOfficerLayout />}>

          <Route path='/circle/talathi' element={<AddTalathi />} />
          <Route path='/circle/staff' element={<AddStaff />} />
          <Route path='/circle/viewTalathis' element={<ViewTalathis />} />
          <Route path='/circle/viewStaff' element={<ViewStaff />} />
          <Route path='/circle/view' element={<CircleViewApplication />} />

        </Route>

      </Routes>
    </div>


  );
}

export default App;
