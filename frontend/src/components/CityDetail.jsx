import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";

export default function CityDetail() {
    const [weather, setWeather] = useState()
    const [name, setName] = useState()
    const [temperature, setTemperature] = useState()
    const [lat, setLat] = useState()
    const [lon, setLon] = useState()
    const [activities, setActivities] = useState([])
    const [showActivities, setShowActivities] = useState(false);
    const [attractions, setAttractions] = useState([]);
    const [showAttractions, setShowAttractions] = useState(false);
    const navigate = useNavigate()
    const {code} = useParams()
    const fetchWeather = async () => {
        console.log(code)
        const response = await fetch(`http://localhost:8000/city/${code}`)
        const data = await response.json() 
        setTemperature(data.temp)
        setWeather(data.desc)
        setName(data.name)
        setLat(data.lat)
        setLon(data.lon)
    }

    const fetchActivities = async () => {
    const response = await fetch(`http://localhost:8000/city/${code}/activities`)
    const data = await response.json()
    setActivities(data.activities)
    setShowActivities(true);
    }

    const fetchAttractions = async () => {
    const response = await fetch(
        `http://localhost:8000/city/${code}/attractions`
    );

    const data = await response.json();
    console.log(data);

    setAttractions(data.attractions);
    setShowAttractions(true);
}

useEffect(() => {
    fetchWeather();
}, [])

    useEffect(()=>{
        fetchWeather();
    },[])
  return (
    <div>
      <p>Hi</p>
        <p>City: {name} </p>
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
        <h3>🌤️ Suggested Activities</h3>

        <ul>
            {activities.map((activity, index) => (
                <li key={index}>{activity}</li>
            ))}
        </ul>
    </>
)}

          {showAttractions && (
    <>
        <h3>🏛 Top Tourist Attractions</h3>

        {attractions.map((place, index) => (
            <div
                key={index}
                style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    margin: "10px 0",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9"
                }}
            >
                📍 {place.name}
            </div>
        ))}
    </>
)}

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
  )
}
