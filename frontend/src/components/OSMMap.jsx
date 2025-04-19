import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  map.setView([lat, lng], 13);
  return null;
};

const OSMMap = ({ setPickupLocation }) => {
  const [position, setPosition] = useState([22.5726, 88.3639]); // Default: Kolkata
  const [searchInput, setSearchInput] = useState("");

  const handleMapClick = (e) => {
    const lat = e.latlng.lat.toFixed(5);
    const lng = e.latlng.lng.toFixed(5);
    setPosition([parseFloat(lat), parseFloat(lng)]);
    setPickupLocation(`Lat: ${lat}, Lng: ${lng}`);
  };

  const handleSearch = async () => {
    if (!searchInput) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchInput
        )}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setPosition([lat, lon]);
        setPickupLocation(`${searchInput} (Lat: ${lat.toFixed(5)}, Lng: ${lon.toFixed(5)})`);
      } else {
        alert("Location not found!");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter pickup location (e.g., Howrah Station)"
          className="p-2 border rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {/* Map */}
      <MapContainer
        center={position}
        zoom={13}
        style={{ width: "100%", height: "400px" }}
        whenCreated={(map) => map.on("click", handleMapClick)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            Pickup Location: {position[0]}, {position[1]}
          </Popup>
        </Marker>
        <RecenterMap lat={position[0]} lng={position[1]} />
      </MapContainer>
    </div>
  );
};

export default OSMMap;

