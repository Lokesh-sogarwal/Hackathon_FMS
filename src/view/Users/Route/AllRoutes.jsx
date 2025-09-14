import { useLocation, useNavigate } from "react-router-dom";
import "./AllRoute.css";
import busImg from "../../../Assets/bus.png";

// 🌍 Haversine formula (distance in km)
const haversine = (coord1, coord2) => {
  if (!coord1 || !coord2 || coord1.some(isNaN) || coord2.some(isNaN)) return 0;
  const R = 6371; // km
  const dLat = ((coord2[0] - coord1[0]) * Math.PI) / 180;
  const dLon = ((coord2[1] - coord1[1]) * Math.PI) / 180;
  const lat1 = (coord1[0] * Math.PI) / 180;
  const lat2 = (coord2[0] * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // km
};

// ⏱️ Safe time parser
const parseTime = (timeStr) => {
  if (!timeStr) return null;
  const parts = timeStr.split(":").map(Number);
  let [h, m, s] = parts;
  if (isNaN(h) || isNaN(m)) return null;
  if (isNaN(s)) s = 0; // default seconds = 0
  const d = new Date();
  d.setHours(h, m, s, 0);
  return d;
};

// 🚍 Calculate total ETA from start → end using lat/lng
const calculateRouteETA = (startLat, startLng, endLat, endLng, avgSpeed = 40) => {
  if (
    [startLat, startLng, endLat, endLng].some(
      (coord) => coord === null || coord === undefined || isNaN(coord)
    )
  ) {
    return { distance: 0, eta: "N/A", duration: 0 };
  }

  const distance = haversine([startLat, startLng], [endLat, endLng]); // km
  const travelHours = distance / avgSpeed;
  const travelMinutes = Math.round(travelHours * 60);

  // Estimate arrival time from *now*
  const now = new Date();
  const etaTime = new Date(now.getTime() + travelMinutes * 60000);

  return {
    distance: distance.toFixed(2), // km
    eta: etaTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    duration: travelMinutes,
  };
};

const RoutesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { routeData } = location.state || {};
  const avgSpeed = 40; // km/h (adjust based on realistic bus speed in city)

  const handleCardClick = (schedule) => {
    const route = {
      ...routeData,
      start_lat: routeData.start_lat || 0,
      start_lng: routeData.start_lng || 0,
      end_lat: routeData.end_lat || 0,
      end_lng: routeData.end_lng || 0,
    };

    const updatedSchedule = {
      ...schedule,
      bus_id: routeData.bus_id || schedule.bus_id,
    };

    navigate("/bus_tracking", {
      state: {
        schedule: updatedSchedule,
        route,
      },
    });
  };

  if (!routeData) return <p className="no-route">No route data available</p>;

  // ⏱️ Calculate ETAs progressively stop-to-stop
  const calculateETAs = (schedules) => {
    if (!schedules?.length) return [];

    const sorted = [...schedules].sort((a, b) => a.sequence - b.sequence);
    let currentTime = null;

    return sorted.map((stop, idx) => {
      if (idx === 0) {
        currentTime = parseTime(stop.arrival_time);
        return {
          ...stop,
          est_reach: currentTime
            ? currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
            : "Invalid time",
          duration: 0,
        };
      }

      const prevStop = sorted[idx - 1];
      const distance = haversine(
        [Number(prevStop.stop_lat), Number(prevStop.stop_lng)],
        [Number(stop.stop_lat), Number(stop.stop_lng)]
      );

      const travelMinutes = Math.round((distance / avgSpeed) * 60);
      if (currentTime) {
        currentTime = new Date(currentTime.getTime() + travelMinutes * 60000);
      }

      return {
        ...stop,
        est_reach: currentTime
          ? currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
          : "Calculating...",
        duration: travelMinutes,
      };
    });
  };

  const schedulesWithETA = calculateETAs(routeData.schedules);

  // 🔹 Direct ETA from start → end
  const directETA = calculateRouteETA(
    Number(routeData.start_lat),
    Number(routeData.start_lng),
    Number(routeData.end_lat),
    Number(routeData.end_lng),
    avgSpeed
  );

  return (
    <div className="routes-container">
      <div className="route-info">
        <p>
          <b>From:</b> {routeData.start_point}
        </p>
        <p>
          <b>To:</b> {routeData.end_point}
        </p>
        <p>
          📏 <b>Distance:</b> {directETA.distance} km
        </p>
        <p>
          ⏱️ <b>Estimated Travel Time:</b> {directETA.duration} min
        </p>
        {/* <p>
          🎯 <b>ETA at Destination:</b> {directETA.eta}
        </p> */}
      </div>

      {schedulesWithETA?.length > 0 ? (
        <div className="schedule-cards">
          {schedulesWithETA.map((sched) => (
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
                  <b>Start:</b> {sched.arrival_time} →{" "}
                  <b>Est. Reach:</b>{" "}
                  {(() => {
                    const base = parseTime(sched.arrival_time);
                    if (!base) return "Invalid time";

                    const est = new Date(base.getTime() + directETA.duration * 60000);
                    return est.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                  })()}
                  {sched.duration > 0 && <span> ({sched.duration} min)</span>}
                </p>

                <p>
                  <b>Status:</b>{" "}
                  <span className={`status-tag ${sched.status}`}>
                    {sched.status}
                  </span>
                </p>
                <p>
                  <b>Date:</b>{" "}
                  {new Date(sched.date).toLocaleDateString("en-GB")}
                </p>
                <p>
                  <b>Stop:</b> {routeData.end_point}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No schedules available for this route.</p>
      )}
    </div>
  );
};

export default RoutesPage;
