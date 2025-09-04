import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import {Logout} from "../../utils/logout";

const navItems = [
  { 
    id: 1,
    title: "Profile",
    icon: <CgProfile />,
    path: "/profile", 
  },
  { 
    id: 2,
    title: "Logout",
    icon: <IoIosLogOut />,
    path: null,     
    action: Logout      
  },
];

export default navItems;
