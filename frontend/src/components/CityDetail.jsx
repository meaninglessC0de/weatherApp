import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CityDetail() {
  const [weather, setWeather] = useState();
  const [name, setName] = useState();
  const [temperature, setTemperature] = useState();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);

  const [attractions, setAttractions] = useState([]);
  const [showAttractions, setShowAttractions] = useState(false);

  const [forecast, setForecast] = useState([]);

  const navigate = useNavigate();
  const { code } = useParams();

  const fetchWeather = async () => {
    const response = await fetch(`http://localhost:8000/city/${code}`);
    const data = await response.json();

    setTemperature(data.temp);
    setWeather(data.desc);
    setName(data.name);
    setLat(data.lat);
    setLon(data.lon);
    setForecast(data.forecast || []);
  };

  const fetchActivities = async () => {
    const response = await fetch(
      `http://localhost:8000/city/${code}/activities`
    );

    const data = await response.json();

    setActivities(data.activities);
    setShowActivities(true);
  };

  const fetchAttractions = async () => {
    const response = await fetch(
      `http://localhost:8000/city/${code}/attractions`
    );

    const data = await response.json();

    setAttractions(data.attractions);
    setShowAttractions(true);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-3">{name}</h4>

          <p>Temperature: {temperature}</p>
          <p>Weather: {weather}</p>

          <button onClick={fetchActivities}>
            🎯 Get Activity Suggestions
          </button>

          <button onClick={fetchAttractions}>
            🏛 Show Top Tourist Attractions
          </button>

          {showActivities && (
            <>
              <h5>🌤️ Suggested Activities</h5>

              <ul>
                {activities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </>
          )}

          {showAttractions && (
            <>
              <h5>🏛 Top Tourist Attractions</h5>

              {attractions.map((place, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    margin: "10px 0",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  📍 {place.name}
                </div>
              ))}
            </>
          )}

          <h5 className="mt-4">Forecast</h5>

          {forecast.map((day) => (
            <p key={day.time}>
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                alt={day.desc}
              />
              {day.time}: {day.temp}, {day.desc}, {day.pop}% rain
            </p>
          ))}

          <button
            onClick={() =>
              navigate(`/city/${code}/map`, {
                state: {
                  lat,
                  lon,
                  name,
                },
              })
            }
          >
            View Map
          </button>
        </div>
      </div>
    </div>
  );
}
