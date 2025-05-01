import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [lat, lng, map]);
  return null;
};

const FullMap = ({ setPickup, setDestination, setRouteInfo, setDistance }) => {
  const [pickupPos, setPickupPos] = useState(null);
  const [destPos, setDestPos] = useState(null);
  const [pickupInput, setPickupInput] = useState("");
  const [destInput, setDestInput] = useState("");
  const [routeCoords, setRouteCoords] = useState([]);

  const hospitalOptions = [
    "S.S.K.M Hospital, Kolkata", "Apollo Gleneagles Hospital, Kolkata", "AMRI Hospital, Salt Lake, Kolkata", "Fortis Hospital, Anandapur, Kolkata", "Belle Vue Clinic, Kolkata", "IPGMER and SSKM Hospital, Kolkata", "Calcutta Medical Research Institute (CMRI), Kolkata", "Medica Super Speciality Hospital, Kolkata", "Ruby General Hospital, Kolkata", "Peerless Hospital, Kolkata", "Tata Medical Center, Kolkata", "Saroj Gupta Cancer Centre and Research Institute, Kolkata", "Institute of Neurosciences Kolkata (INK)", "B.R. Singh Hospital, Kolkata", "Nil Ratan Sircar Medical College and Hospital (NRS), Kolkata", "Narayana Multispeciality Hospital, Howrah", "BM Birla Heart Research Centre, Kolkata", "Desun Hospital, Kolkata", "Woodlands Multispeciality Hospital, Kolkata", "Vivekananda Institute of Medical Sciences, Kolkata"
  ];

  const geocode = async (query) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`
    );
    const data = await res.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        display_name: data[0].display_name,
      };
    }
    return null;
  };

  const fetchRoute = async (from, to) => {
    const res = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`
    );
    const data = await res.json();
    if (data.routes && data.routes.length > 0) {
      const coords = data.routes[0].geometry.coordinates.map((c) => [
        c[1],
        c[0],
      ]);
      setRouteCoords(coords);
      setRouteInfo(data.routes[0]);
      const distanceInKm = data.routes[0].distance / 1000;
      setDistance(distanceInKm.toFixed(2));
    } else {
      setRouteCoords([]);
      setRouteInfo(null);
      setDistance(null);
    }
  };

  const handleSearch = async () => {
    const pickupLoc = await geocode(pickupInput);
    const destLoc = await geocode(destInput);
    if (pickupLoc && destLoc) {
      setPickupPos([pickupLoc.lat, pickupLoc.lng]);
      setDestPos([destLoc.lat, destLoc.lng]);
      setPickup(pickupLoc);
      setDestination(destLoc);
      fetchRoute(pickupLoc, destLoc);
    } else {
      alert("Could not find one or both locations.");
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bars */}
      <div className="flex gap-2">
        <input
          type="text"
          value={pickupInput}
          onChange={(e) => setPickupInput(e.target.value)}
          placeholder="Enter pickup location"
          className="p-2 border rounded w-full"
        />
        <select
          value={destInput}
          onChange={(e) => setDestInput(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">Select a hospital</option>
          {hospitalOptions.map((hospital, idx) => (
            <option key={idx} value={hospital}>
              {hospital}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="!bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {/* Map */}
      <MapContainer
        center={[22.5726, 88.3639]} // Kolkata default
        zoom={13}
        style={{ width: "100%", height: "400px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {pickupPos && (
          <Marker position={pickupPos}>
            <Popup>Pickup Location</Popup>
          </Marker>
        )}
        {destPos && (
          <Marker position={destPos}>
            <Popup>Destination</Popup>
          </Marker>
        )}
        {pickupPos && <RecenterMap lat={pickupPos[0]} lng={pickupPos[1]} />}
        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} color="blue" />
        )}
      </MapContainer>
    </div>
  );
};

export default FullMap;
