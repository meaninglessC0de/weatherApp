import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";

export default function CityDetail() {
    const [weather, setWeather] = useState()
    const [name, setName] = useState()
    const [temperature, setTemperature] = useState()
    const [lat, setLat] = useState()
    const [lon, setLon] = useState()
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
    useEffect(()=>{
        fetchWeather()
    },[])
  return (
    <div>
      <p>Hi</p>
        <p>Country: {name} </p>
        <p>Temperature: {temperature}</p>
        <p>Weather: {weather}</p>
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
