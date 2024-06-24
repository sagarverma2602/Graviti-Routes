import React from "react";

interface RouteInfoBlockProps {
  distance: string | null;
  duration: string | null;
  origin: string | undefined;
  destination: string | undefined;
}

const RouteInfoBlock: React.FC<RouteInfoBlockProps> = ({
  destination,
  distance,
  duration,
  origin,
}) => {
  if (origin && destination && distance && duration) {
    return (
      <div className="border border-gray-secondary rounded-lg">
        <div className="bg-white flex font-bold justify-between px-10 py-5 text-2xl">
          <div className=" ">Distance</div>
          <div className="text-secondary">{distance ? distance : "N/A"}</div>
        </div>
        <div className="py-8 px-10 text-center">
          The distance between <b>{origin}</b> and <b>{destination}</b> via the
          seleted route is <b>{distance}</b>.
          <div className="font-bold">ETA: {duration}</div>
        </div>
      </div>
    );
  }
};

export default RouteInfoBlock;
