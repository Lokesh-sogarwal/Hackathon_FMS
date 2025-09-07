import React, { useEffect } from 'react';
import './dashboard.css';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import Chart from './Dashboardchart/chart';
import TotalUsers from './Dashboardchart/total_Users';
// import Active_Users from './Dashboardchart/active_user';
// import Total_Blogs from '../Blogs/total_Blogs/total_blog';
// import Blog_chart from '../Blogs/total_Blogs/blogs_chart';

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      return decoded.exp < now;
    } catch (err) {
      return true;
    }
  };

  const check_password_change = (token) => {
    try {
      const decoded = jwtDecode(token);
      const is_password_change = decoded.is_password_change;
      if (is_password_change === false) {
        navigate('/defaultchangepassword');
      }
    } catch {
      console.log('error');
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      toast.error("Session expired. Please log in again.");
      setTimeout(() => {
        logoutUser();
      }, 3000);
      return;
    }
    check_password_change(token);
  }, [token]);

  return (
    <>
      <div className="container">
        <div className="row dashboard-container text-center">
          <div className="col-md-6">
            <div className="User-card d-flex flex-column align-items-center justify-content-center">
              <TotalUsers />
            </div>
          </div>
          <div className="col-md-6">
            {/* <div className="User-card d-flex flex-column align-items-center justify-content-center">
              <Total_Blogs />
            </div> */}
          </div>
        </div>
      </div>

      <div className="chart-container">
        <div className="d-flex flex-column align-items-center justify-content-center Chart-card">
          <Chart />
        </div>
        {/* <div className="d-flex flex-column align-items-center justify-content-center Chart-card">
          <Blog_chart />
        </div> */}
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
