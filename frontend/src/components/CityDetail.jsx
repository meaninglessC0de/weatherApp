import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from "react-router";

export default function CityDetail() {
    const [weather, setWeather] = useState()
    const [name, setName] = useState()
    const [temperature, setTemperature] = useState()
    const {code} = useParams()
    const fetchWeather = async () => {
        console.log(code)
        const response = await fetch(`http://localhost:8000/city/${code}`)
        const data = await response.json() 
        setTemperature(data.temp)
        setWeather(data.desc)
        setName(data.name)
    }
    useEffect(()=>{
        fetchWeather()
    },[])
  return (
            <div className="container" style={{ maxWidth: "400px" }}>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title mb-3">{name}</h4>
                    <p>Temperature: {temperature}</p>
                    <p>Weather: {weather}</p>
                    <Link to={`/city/${code}/map`}>Map</Link>
                </div>  
            </div>
        </div>

  )
}
