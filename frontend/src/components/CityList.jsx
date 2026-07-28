import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CityList.css";
import { useAuth } from "./AuthContext";

const API_URL = "http://127.0.0.1:8000";

export default function CityList() {
  const [cities, setCities] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCities();
  }, []);

  useEffect(() => {
    if (user) {
      fetchCities();
    }
  }, [user]);

  async function fetchCities() {
    try {
      const response = await fetch(`${API_URL}/cities/${user}`);

      if (!response.ok) {
        throw new Error("Could not fetch cities");
      }

      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchAllCities() {
    try {
      const response = await fetch(`${API_URL}/cities/all`);

      if (!response.ok) {
        throw new Error("Could not fetch city list");
      }

      const data = await response.json();
      setAllCities(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function addCity() {
    if (selectedCode === "") {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/cities/${user}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: selectedCode,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not add city");
      }

      setSelectedCode("");
      await fetchCities();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteCity(cityId) {
    try {
      const response = await fetch(`${API_URL}/cities/${user}/${cityId}`, {
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

  // keep track of what we have added and what we do not

  return (
    <div className="city-container">
      {user && <h1>{`${user}'s`} City List</h1>}

      <select
        value={selectedCode}
        onChange={(event) => setSelectedCode(event.target.value)}
      >
        <option value="">Select a city</option>
        {allCities.map((city) => (
          <option key={city.code} value={city.code}>
            {city.name}
          </option>
        ))}
      </select>

      <button onClick={addCity} disabled={selectedCode === ""}>
        Add City
      </button>

      <ul>
        {cities.map((city) => (
          <li key={city.code}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/city/${city.code}`)}
            >
              📍 {city.name}
            </span>

            <button onClick={() => deleteCity(city.code)}>Delete</button>
          </li>
        ))}
      </ul>

      <p>Total Cities: {cities.length}</p>
    </div>
  );
}
