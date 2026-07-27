import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from "react-router";

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
    <div>
      <p>Hi</p>
        <p>Country: {name} </p>
        <p>Temperature: {temperature}</p>
        <p>Weather: {weather}</p>
    </div>
  )
}
