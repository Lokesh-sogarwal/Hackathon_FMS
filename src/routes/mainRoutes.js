// import Dashboard from '../view/users/Dashboard/dashboard';
import Profile from '../view/Users/Profile/Profile';
// import AboutUs from '../view/users/User_details/aboutus';
import Userdetails from '../view/Users/UserDeatils/UserDetails'; 
// import Change_password from '../view/users/ChangePassword/Changepassword';
// import Otp from '../view/auth/OTP/Otp';
// import Active_Users from '../view/users/Dashboard/Active_user_details/active_user_details';
// import Chat from '../view/Chatbox/chat';
import DriverDetails from '../view/Users/Drivers/Driver_details';
import DriverUpload from '../view/Users/Upload_File/DriverUpload';
import LiveTracking from '../view/Users/Live Tracking/LiveTracking';
import BusRoute from '../view/Users/Route/BusRoute';
import AllRoutes from '../view/Users/Route/AllRoutes';
import BusTracking from '../view/Users/Live Tracking/BusTracking';



export const userRoutes = [
//   {
//     id: 1,
//     path: "dashboard",   // no leading slash for nested routes
//     element: <Dashboard />
//   },
  {
    id: 2,
    path: "profile",
    element: <Profile />
  },
//   {
//     id: 3,
//     path: "aboutus",
//     element: <AboutUs />
//   },
  {
    id: 4,
    path: "users",
    element: <Userdetails />
  },
//   {
//     id: 5,
//     path: "defaultchangepassword",
//     element: <Change_password />
//   },
//   {
//     id: 6,
//     path: "verify_otp",
//     element: <Otp />
//   },
//   {
//     id: 7,
//     path: "active_users",
//     element: <Active_Users />   // ✅ will render inside Layout
//   },
//   {
//     id:13,
//     path:"Chats",
//     element:<Chat/>
//   },
  {
    id: 14,
    path: "drivers",
    element: <DriverDetails />
  },
  {
    id: 15,
    path: "upload",
    element: <DriverUpload />
  },
  {
    id: 16,
    path: "live_tracking",
    element: <LiveTracking />
  },
  {
    id: 17,
    path: "Create_routes",
    element: <BusRoute />
  },{
    id: 18,
    path: "all_routes",
    element: <AllRoutes />
  }
  ,{
    id: 19,
    path: "schedule-details",
    element: <BusTracking />
  }

];
