"use client";
import { useMapEvents } from "react-leaflet";
import { CustomLocation } from "../../../types";

interface LocationPickerProps {
  onSelectLocation: (location: CustomLocation) => void;
}
const LocationPicker: React.FC<LocationPickerProps> = ({
  onSelectLocation,
}) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await response.json();

        // if (data.display_name) {
        //   const addressParts = data.display_name.split(",");
        //   addressParts.pop(); // Remove country
        //   const address = addressParts.join(",").trim();

        //   onSelectLocation({
        //     coordinates: [lat, lng],
        //     address,
        //   });
        // } else {
        //   onSelectLocation({
        //     coordinates: [lat, lng],
        //     address: `Lat: ${lat}, Lng: ${lng}`,
        //   });
        // }
        if (data.display_name) {
          const addressParts = data.display_name.split(",");
          addressParts.pop(); // Remove country
          const address = addressParts.join(",").trim();

          onSelectLocation({
            lat, // Include lat
            lng, // Include lng
            coordinates: [lat, lng], // Optional for backward compatibility
            address,
          });
        } else {
          onSelectLocation({
            lat, // Include lat
            lng, // Include lng
            coordinates: [lat, lng], // Optional for backward compatibility
            address: `Lat: ${lat}, Lng: ${lng}`,
          });
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    },
  });

  return null;
};

export default LocationPicker;
