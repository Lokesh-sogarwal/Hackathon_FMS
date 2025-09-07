import React, { useEffect, useState } from "react";
import { Map, Marker } from "pigeon-maps";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

import "./LiveTracking.css";

const LiveTracking = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation
  const [position, setPosition] = useState([20.5937, 78.9629]);
  const [startingPoint, setStartingPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [startCoords, setStartCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [isGeocoding, setIsGeocoding] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const coords = [latitude, longitude];
          setPosition(coords);
          setStartCoords(coords);

          try {
            const res = await fetch(
              `http://localhost:5000/bus/geocode?address=${latitude},${longitude}`
            );
            const data = await res.json();
            if (data && data.length > 0) {
              setStartingPoint(data[0].display_name || "Current Location");
            } else {
              setStartingPoint("Current Location");
            }
          } catch (err) {
            console.error("Failed to get current location name", err);
          }
        },
        (err) => {
          console.error("Geolocation failed", err);
        }
      );
    }
  }, []);

  const geocodeAddress = async (address, setter, updateMap = false) => {
    if (!address || isGeocoding) return;
    setIsGeocoding(true);

    try {
      const res = await fetch(
        `http://localhost:5000/bus/geocode?address=${encodeURIComponent(address)}`
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        setter(coords);
        if (updateMap) setPosition(coords);
      } else {
        console.warn(`No coordinates found for "${address}"`);
      }
    } catch (err) {
      console.error(`Failed to geocode "${address}"`, err);
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleGetRoute = async () => {
    if (!startingPoint || !destination) {
      console.warn("Please provide both starting point and destination");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/bus/get_routes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ starting_point: startingPoint, destination }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Navigate to /routes and pass route data
        navigate("/all_routes", { state: { routeData: data } });

        // Optional: update map markers
        geocodeAddress(startingPoint, setStartCoords, true);
        geocodeAddress(destination, setDestCoords);
      } else {
        console.warn(data.message || data.error);
      }
    } catch (err) {
      console.error("Server error", err);
    }
  };

  return (
    <div className="livetracking-container">
      <div className="map">
        <Map height={650} center={position} defaultZoom={12}>
          {startCoords && <Marker anchor={startCoords} color="green" />}
          {destCoords && <Marker anchor={destCoords} color="red" />}
        </Map>
      </div>

      <div className="route_details">
        <label>Starting Point</label>
        <input
          value={startingPoint}
          onChange={(e) => setStartingPoint(e.target.value)}
          onBlur={() => geocodeAddress(startingPoint, setStartCoords, true)}
          placeholder="Enter starting point"
        />

        <label>Destination</label>
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          onBlur={() => geocodeAddress(destination, setDestCoords)}
          placeholder="Enter destination"
        />

        <button onClick={handleGetRoute}>Get Route</button>
      </div>
    </div>
  );
};

export default LiveTracking;
