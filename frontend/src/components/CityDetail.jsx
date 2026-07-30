import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CityDetail() {
  const [weather, setWeather] = useState();
  const [name, setName] = useState();
  const [temperature, setTemperature] = useState();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [forecast, setForecast] = useState([]);
  const navigate = useNavigate();
  const { code } = useParams();
  const fetchWeather = async () => {
    console.log(code);
    const response = await fetch(`http://localhost:8000/city/${code}`);
    const data = await response.json();
    setTemperature(data.temp);
    setWeather(data.desc);
    setName(data.name);
    setLat(data.lat);
    setLon(data.lon);
    setForecast(data.forecast);
  };
  useEffect(() => {
    fetchWeather();
  }, []);
  return (
    <div class="container" style={{ maxWidth: "500px" }}>
      <div class="card">
        <div class="card-body">
          <h4 className="card-title mb-3">{name}</h4>
          <p>Temperature: {temperature}</p>
          <p>Weather: {weather}</p>
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
