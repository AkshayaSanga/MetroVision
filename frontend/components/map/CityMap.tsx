"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const points = [
  { title: "Road Damage", type: "Complaint", area: "Madhapur", lat: 17.4483, lng: 78.3915 },
  { title: "Water Leakage", type: "Complaint", area: "Kukatpally", lat: 17.4948, lng: 78.3996 },
  { title: "Traffic Signal", type: "Asset", area: "Hitech City", lat: 17.4435, lng: 78.3772 },
  { title: "Critical Accident", type: "Alert", area: "Gachibowli", lat: 17.4401, lng: 78.3489 },
];

export default function CityMap() {
  return (
    <div>
      <div className="mb-6 rounded-xl border border-[#CBD5E1] bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B45309]">
          Spatial Intelligence
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-[#111827]">
          GIS Command Center
        </h1>
        <p className="mt-2 text-sm text-[#64748B]">
          Live view of complaints, assets and emergency alerts across Hyderabad.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.5fr]">
        <div className="overflow-hidden rounded-xl border border-[#CBD5E1] bg-white shadow-sm">
          <MapContainer
            center={[17.385, 78.4867]}
            zoom={11}
            className="h-[650px] w-full"
          >
            <TileLayer
              attribution="© OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {points.map((p) => (
              <Marker key={p.title} position={[p.lat, p.lng]} icon={icon}>
                <Popup>
                  <b>{p.title}</b>
                  <br />
                  {p.type}
                  <br />
                  {p.area}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="rounded-xl border border-[#CBD5E1] bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#111827]">
            Map Layers
          </h2>

          <div className="mt-5 space-y-3 text-sm">
            <p>✅ Complaints</p>
            <p>✅ Assets</p>
            <p>✅ Emergency Alerts</p>
            <p>✅ Hyderabad Zones</p>
          </div>

          <div className="mt-6 rounded-lg bg-[#F8FAFC] p-4">
            <p className="font-semibold text-[#111827]">Live Points</p>
            <p className="mt-2 text-3xl font-semibold text-[#0F766E]">
              {points.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}