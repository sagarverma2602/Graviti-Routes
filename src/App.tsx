import { Libraries, useLoadScript } from "@react-google-maps/api";
import React, { useRef, useState, createRef, useEffect } from "react";
import {
  DirectionForm,
} from "./components";
import Header from "./components/header";
import GravitiLogo from "./assets/graviti-logo.svg";
import MapContainer from "./components/map-container";

const center = { lat: 22, lng: 77 };
const libraries = ["places"] as Libraries;

const App = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

  const [directionResponse, setDirectionResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [waypoints, setWaypoints] = useState<
    { ref: React.RefObject<HTMLInputElement>; value: string }[]
  >([]);
  const [showWaypointInput, setShowWaypointInput] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  const [origin, setOrigin] = useState<google.maps.LatLng | null>(null);
  const [destination, setDestination] = useState<google.maps.LatLng | null>(
    null
  );
  const [waypointLocations, setWaypointLocations] = useState<
    google.maps.LatLng[]
  >([]);

  const calculateRoute = async () => {
    if (originRef.current?.value === "" || destinationRef.current?.value === "")
      return;

    const directionsService = new google.maps.DirectionsService();

    const validWaypoints = waypoints.filter((wp) => wp.value !== "");

    const result = await directionsService.route({
      origin: originRef.current?.value as
        | string
        | google.maps.LatLngLiteral
        | google.maps.LatLng,
      destination: destinationRef.current?.value as
        | string
        | google.maps.LatLngLiteral
        | google.maps.LatLng,
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: validWaypoints.map((wp) => ({
        location: wp.value,
        stopover: true,
      })),
    });
    const routeDistance=result.routes[0].legs.reduce((acc,leg)=>{
      const arr=leg['distance']['text'].split(' ')[0].split(',')
      const res=arr.join('')
      return acc+parseInt(res)
    },0)

    setDirectionResponse(result);
    setDistance(routeDistance.toString()+' km');
    setDuration(result.routes[0].legs[0].duration.text);
    setOrigin(result.routes[0].legs[0].start_location);
    setDestination(
      result.routes[0].legs[result.routes[0].legs.length - 1].end_location
    );
    setWaypointLocations(
      result.routes[0].legs
        .slice(1, result.routes[0].legs.length)
        .map((leg) => leg.start_location)
    );
  };

  const handleAddStop = () => {
    if (
      waypoints.length === 0 ||
      waypoints[waypoints.length - 1].value !== ""
    ) {
      setShowWaypointInput(true);
      setWaypoints((prevWaypoints) => [
        ...prevWaypoints,
        { ref: createRef<HTMLInputElement>(), value: "" },
      ]);
      setError("");
    } else {
      setError("Please fill in the previous waypoint before adding a new one.");
    }
  };

  const handleWaypointPlaceChanged = (index: number) => {
    const waypointRef = waypoints[index].ref;
    if (waypointRef.current) {
      setWaypoints((prevWaypoints) =>
        prevWaypoints.map((wp, i) =>
          i === index
            ? { ...wp, value: waypointRef.current?.value as string }
            : wp
        )
      );
    }
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  if (!isLoaded)
    return (
      <div className="flex h-screen items-center justify-center text-2xl text-primary font-bold bg-background">
        Loading...
      </div>
    );

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header logo={GravitiLogo} />
      <div className=" text-center text-primary text-xl py-8">
        Let's calculate <b>distance</b> from Google maps
      </div>
      <div className="flex flex-1  flex-col-reverse md:flex-row">
        <DirectionForm
          distance={distance}
          duration={duration}
          waypoints={waypoints}
          showWaypointInput={showWaypointInput}
          error={error}
          originRef={originRef}
          destinationRef={destinationRef}
          handleWaypointPlaceChanged={handleWaypointPlaceChanged}
          handleAddStop={handleAddStop}
          calculateRoute={calculateRoute}
        />

        <div className="flex flex-1 p-20">
          <MapContainer
            directionResponse={directionResponse}
            origin={origin}
            destination={destination}
            waypointLocations={waypointLocations}
            center={center}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
