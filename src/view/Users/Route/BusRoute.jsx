import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BusRoute.css"; // Import custom CSS

const RouteCreation = () => {
  const [routes, setRoutes] = useState([]);
  const [routeName, setRouteName] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddRoute = async (e) => {
    e.preventDefault();

    if (!routeName || !startPoint || !endPoint) {
      toast.error("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:5000/bus/bus_route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ fixed header
        },
        body: JSON.stringify({
          route_name: routeName,
          starting: startPoint,
          destination: endPoint,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setRoutes([...routes, result.route]);
        setRouteName("");
        setStartPoint("");
        setEndPoint("");
        toast.success("✅ Route created successfully!");
      } else {
        toast.error(result.error || "❌ Something went wrong");
      }
    } catch (error) {
      console.error("Error adding route:", error);
      toast.error("🚨 Server error, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="route-container">


      <div className="route-form-card">
        <form onSubmit={handleAddRoute} className="route-form">
          <div className="form-group">
            <label>Route Name</label>
            <input
              type="text"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              placeholder="e.g., City Center Express"
            />
          </div>

          <div className="form-group">
            <label>Starting Point</label>
            <input
              type="text"
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
              placeholder="e.g., Main Bus Stand"
            />
          </div>

          <div className="form-group">
            <label>Destination</label>
            <input
              type="text"
              value={endPoint}
              onChange={(e) => setEndPoint(e.target.value)}
              placeholder="e.g., Airport"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Route"}
          </button>
        </form>
      </div>

      {/* Routes List */}
      {routes.length > 0 && (
        <div className="routes-list">
          <h2>Created Routes</h2>
          <ul>
            {routes.map((route, index) => (
              <li key={index} className="route-item">
                <span className="route-name">{route.route_name}</span>
                <span className="route-path">
                  {route.start_point} → {route.end_point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default RouteCreation;
