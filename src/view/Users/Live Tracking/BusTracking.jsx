import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Map, Marker } from "pigeon-maps";
import "./BusTracking.css";
import myimg from '../../../Assets/male-avatar-boy-face-man-user-9-svgrepo-com.svg'

const BusTracking = () => {
  const location = useLocation();
  const { schedule } = location.state || {}; // ✅ Get schedule details from card click
  const [busPosition, setBusPosition] = useState([28.7041, 77.1025]); // Default Delhi

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/get_bus_location/bus_1"); // ✅ API from backend
        const data = await res.json();
        if (data.location) {
          setBusPosition(data.location);
        }
      } catch (err) {
        console.error("Error fetching bus location:", err);
      }
    }, 3000); // update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bus-tracking-container">
      {/* Left Side: Map */}
      <div className="map-section">
        <Map center={busPosition} zoom={12} height={500}>
          <Marker width={50} anchor={busPosition} color="blue" />
        </Map>
        <p className="coords">
          🚍 Current Location: {busPosition[0].toFixed(4)},{" "}
          {busPosition[1].toFixed(4)}
        </p>
      </div>

      {/* Right Side: Bus & Schedule Info */}
      <div className="details-section">
        <h2>Bus & Schedule Details</h2>
        {schedule ? (
          <div className="schedule-details">
            <div className="img">
                <img src={myimg} alt="" />
            </div>
            <p>
              <b>Route:</b> {schedule.start_point} → {schedule.end_point}
            </p>
            <p>
              <b>Driver:</b> {schedule.driver_name}
            </p>
            <p>
              <b>Bus Number:</b> {schedule.bus_number}
            </p>
            <p>
              <b>Arrival:</b> {schedule.arrival_time}
            </p>
            <p>
              <b>Departure:</b> {schedule.departure_time || "—"}
            </p>
            <p>
              <b>Status:</b>{" "}
              <span className={`status-tag ${schedule.status}`}>
                {schedule.status}
              </span>
            </p>
          </div>
        ) : (
          <p>No schedule details available</p>
        )}
      </div>
    </div>
  );
};

export default BusTracking;
