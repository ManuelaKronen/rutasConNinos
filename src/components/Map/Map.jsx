import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon issue in some environments
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Create your custom icon
const customIcon = new L.Icon({
  iconUrl: "/marker.png", // <-- Put your image path here
  iconSize: [50, 50], // size of the icon
  iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // point from which the popup should open relative to the iconAncho
  shadowSize: [41, 41],
  shadowAnchor: [13, 41],
});

// Example points with id, name, latitude, and longitude
const locations = [
  { id: 1, name: "Solusoft", lat: 40.3559, lng: -3.7426 },
  {
    id: 2,
    name: "La Vaguada",
    lat: 40.4793,
    lng: -3.71118,
  },
  {
    id: 3,
    name: "Puerta del Sol",
    lat: 40.41673,
    lng: -3.70334,
  },
];

export default function Map() {
  return (
    <MapContainer
      center={[40.4168, -3.7038]} // ← Madrid
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map(({ id, name, lat, lng }) => (
        <Marker key={id} position={[lat, lng]} icon={customIcon}>
          <Popup>{name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
