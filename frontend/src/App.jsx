import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CityList from "./components/CityList";
import CityDetail from "./components/CityDetail";
import MapPage from "./components/Map";
import Login from "./components/Login";
import { useAuth } from "./components/AuthContext";
import Signup from "./components/Signup";
import NavBar from "./components/NavBar";

function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/signup" element={<Signup />} />

        {user && <Route path="/" element={<CityList />} />}
        {!user && <Route path="/" element={<Login />} />}

        {user && <Route path="/city/:code" element={<CityDetail />} />}
        {user && <Route path="/city/:code/map" element={<MapPage />} />}
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
