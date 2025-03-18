"use client";
import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { CustomLocation } from "../../../types";
import LocationPicker from "../location-picker/LocationPicker";

// **Fix Leaflet Marker Issue**
const markerIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
interface SharedMapProps {
  pickupLocation: CustomLocation | null;
  destinationLocation: CustomLocation | null;
  onSelectLocation: (location: CustomLocation) => void;
}

const SharedMap: React.FC<SharedMapProps> = ({
  pickupLocation,
  destinationLocation,
  onSelectLocation,
}) => {
  return (
    <div className="h-64 w-full border rounded-md overflow-hidden">
      <MapContainer
        center={[9.082, 8.6753]} // Default Nigeria
        zoom={6}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en" />
        <LocationPicker onSelectLocation={onSelectLocation} />

        {pickupLocation?.coordinates && (
          <Marker position={pickupLocation.coordinates} icon={markerIcon} />
        )}
        {destinationLocation?.coordinates && (
          <Marker
            position={destinationLocation.coordinates}
            icon={markerIcon}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default SharedMap;
