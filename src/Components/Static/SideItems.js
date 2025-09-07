import { MdDashboard } from "react-icons/md";
import {FaUser , FaUsers,FaMapMarkedAlt} from "react-icons/fa"
import { TbRouteSquare } from "react-icons/tb";
import { IoIosNotifications } from "react-icons/io";
import { MdFeedback } from "react-icons/md";
import { FaBusAlt } from "react-icons/fa";
export const Items = [
    {
        id: 1,
        title: "Dashboard",
        icon: <MdDashboard/>,
        link: "/dashboard"
    },
    {
        id: 2,
        title: "Active Users",
        icon: <FaUsers/>,
        link: "/active_users"
    },
    {
        id: 3,
        title: "Users",
        icon: <FaUser/>,
        link: "/users"
    },
    {
        id: 4,
        title: "Driver",
        icon: <FaBusAlt/>,
        link: "/drivers"
    },
    {
        id: 5,
        title: "Create Route",
        icon: <TbRouteSquare/>,
        link: "/Create_routes"
    },
    {
        id: 6,
        title: "Buses",
        icon: <MdFeedback/>,
        link: "/Bus_details"
    },
    {
        id: 7,
        title: "Live Tracking",
        icon: <FaMapMarkedAlt/>,
        link: "live_tracking"
    },
    {
        id: 8,
        title: "Notification",
        icon: <IoIosNotifications/>,
        link: "/notification"
    },
    {
        id: 9,
        title: "Schedule",
        icon: <IoIosNotifications/>,
        link: "/bus_schedule"
    },
    {
        id: 10,
        title: "Upload Document",
        icon: <MdFeedback/>,
        link: "/upload"
    },
    {
        id: 11,
        title: "Feedback & Complaints",
        icon: <MdFeedback/>,
        link: "/Feedback_Complaints"
    },
    {
        id: 12,
        title: "Register Bus",
        icon: <MdFeedback/>,
        link: "/Bus_register"
    },
    
]