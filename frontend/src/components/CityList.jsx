import React, { useEffect, useState } from "react";
import "./CityList.css";

const API_URL = "http://127.0.0.1:8000";

export default function CityList() {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState("");

  useEffect(() => {
    fetchCities();
  }, []);

  async function fetchCities() {
    try {
      const response = await fetch(`${API_URL}/cities`);

      if (!response.ok) {
        throw new Error("Could not fetch cities");
      }

      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function addCity() {
    const cityName = newCity.trim();

    if (cityName === "") {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: cityName,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not add city");
      }

      setNewCity("");
      await fetchCities();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteCity(cityId) {
    try {
      const response = await fetch(`${API_URL}/cities/${cityId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not delete city");
      }

      await fetchCities();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="city-container">
      <h1>🌤️ MY CITY LIST</h1>

      <input
        type="text"
        value={newCity}
        placeholder="Enter a city"
        onChange={(event) => setNewCity(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            addCity();
          }
        }}
      />

      <button onClick={addCity}>Add City</button>

      <ul>
        {cities.map((city) => (
          <li key={city.id}>
            <span>📍 {city.city}</span>

            <button onClick={() => deleteCity(city.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <p>Total Cities: {cities.length}</p>
    </div>
  );
}


