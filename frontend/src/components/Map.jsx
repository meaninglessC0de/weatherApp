import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useLocation } from "react-router-dom";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const { state } = useLocation();

  if (!state) {
    return <h2>No location data found.</h2>;
  }

  const { lat, lon, name } = state;

  return (
    <div>
      <h2>{name}</h2>

      <MapContainer
        center={[lat, lon]}
        zoom={10}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[lat, lon]}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
