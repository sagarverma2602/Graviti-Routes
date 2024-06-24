import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";
import React from "react";
import OriginMarker from "../assets/origin-icon.svg";
import DestinationMarker from "../assets/destination-icon.svg";
import WaypointMarker from "../assets/waypoint-icon.svg";

interface MapContainerProps {
  directionResponse: google.maps.DirectionsResult | null;
  origin: google.maps.LatLng | null;
  destination: google.maps.LatLng | null;
  waypointLocations: google.maps.LatLng[];
  center: google.maps.LatLngLiteral;
}

const MapContainer: React.FC<MapContainerProps> = ({
  directionResponse,
  origin,
  destination,
  waypointLocations,
  center,
}) => {
  return (
    <div className="flex-1  border border-gray-primary rounded-lg">
      <GoogleMap
        mapContainerStyle={{ height: "100%" }}
        center={center}
        zoom={5}
        options={{ disableDefaultUI: true }}
      >
        {directionResponse && (
          <>
            <DirectionsRenderer
              options={{ suppressMarkers: true }}
              directions={directionResponse}
            />
            {origin && (
              <Marker position={origin} options={{ icon: OriginMarker }} />
            )}
            {waypointLocations.map((location, index) => (
              <Marker
                key={index}
                position={location}
                options={{ icon: WaypointMarker }}
              />
            ))}
            {destination && (
              <Marker
                position={destination}
                options={{ icon: DestinationMarker }}
              />
            )}
          </>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapContainer;
