import React from 'react';
import './nav.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaUserCircle } from "react-icons/fa";
import DropButton from '../dropdown-Button/dropdown';

const Nav = () => {
    const token = localStorage.getItem('token');
    const islogin = !!token;
    const navigate = useNavigate();
    const location = useLocation();
    let role = '';

    if (token) {
        try {
            const decode = jwtDecode(token);
            role = decode.role;
        } catch (err) {
            console.error("Invalid token:", err);
        }
    }

    const logout = async () => {
        if (!token) return;

        try {
            const res = await fetch("http://localhost:5000/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                credentials: "include"
            });

            const data = await res.json();
            if (res.ok) localStorage.removeItem("token");
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // ✅ Create full breadcrumb array
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbPaths = pathSegments.map((seg, idx) => {
        return {
            name: seg.charAt(0).toUpperCase() + seg.slice(1),
            path: '/' + pathSegments.slice(0, idx + 1).join('/')
        };
    });
    const isDashboard = location.pathname === "/dashboard" || location.pathname === "/";

    return (
        <div className="main">
            <div className="nav">

                <div className="path">
                    <span className="current-path">
                        <span className="breadcrumb">
                            <span onClick={() => navigate('/')}>Home</span>
                            {!isDashboard &&
                                breadcrumbPaths.map((seg, i) => (
                                    <React.Fragment key={i}>
                                        <span> / </span>
                                        <span onClick={() => navigate(seg.path)}>{seg.name}</span>
                                    </React.Fragment>
                                ))}
                        </span>
                    </span>
                </div>

                <DropButton/>
            </div>
        </div>
    );
};

export default Nav;
