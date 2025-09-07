import { useLocation, useNavigate } from "react-router-dom";
import "./AllRoute.css";
import busImg from "../../../Assets/bus.png";

const RoutesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { routeData } = location.state || {};

  const handleCardClick = (schedule) => {
    navigate("/schedule-details", { state: { schedule } });
  };

  return (
    <div className="routes-container">
      {routeData ? (
        <div>
          {/* Route Info */}
          <div className="route-info">
            <p>
              <b>From:</b> {routeData.start_point}
            </p>
            <p>
              <b>To:</b> {routeData.end_point}
            </p>
          </div>

          {/* ✅ Bus Schedule Cards */}
          {routeData.schedules && routeData.schedules.length > 0 ? (
            <div className="schedule-cards">
              {routeData.schedules.map((sched) => (
                <div
                  key={sched.schedule_id}
                  className={`schedule-card status-${sched.status}`}
                  onClick={() => handleCardClick(sched)}
                >
                  <div className="card-header">
                    <img src={busImg} alt="Bus" className="bus-img" />
                    <h3>
                      {routeData.start_point} → {routeData.end_point}
                    </h3>
                  </div>
                  <div className="card-body">
                    <p>
                      <b>Time:</b> {sched.arrival_time} →{" "}
                      {sched.departure_time || "—"}
                    </p>
                    <p>
                      <b>Status:</b>{" "}
                      <span className={`status-tag ${sched.status}`}>
                        {sched.status}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No schedules available for this route.</p>
          )}
        </div>
      ) : (
        <p className="no-route">No route data available</p>
      )}
    </div>
  );
};

export default RoutesPage;
