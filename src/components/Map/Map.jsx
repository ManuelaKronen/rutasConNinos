import React, { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-gpx";

export default function Map() {
  useEffect(() => {
    const map = L.map("map").setView([40.4168, -3.7038], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const gpx = new L.GPX(
      "/puente-medieval-del-batan-a-puente-del-grajal-por-ambos-marg.gpx",
      {
        async: true,
        markers: {
          startIcon: null,
          endIcon: null,
        },
        polyline_options: {
          color: "blue",
          weight: 4,
          opacity: 0.7,
        },
        onEachFeature: function (feature, layer) {
          if (feature.properties && feature.properties.name) {
            const popupContent = `
              <strong>${feature.properties.name}</strong><br>
              ${feature.properties.desc || "No description available."}<br>
              <a href="${
                feature.properties.link
              }" target="_blank">View on Wikiloc</a>
            `;
            layer.bindPopup(popupContent);
          }
        },
      }
    )
      .on("loaded", function (e) {
        map.fitBounds(e.target.getBounds());
      })
      .addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
}
