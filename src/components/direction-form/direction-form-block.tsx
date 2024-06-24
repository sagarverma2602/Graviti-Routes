import React from "react";
import { FormControl, Input, RouteInfoBlock } from "..";
import { Autocomplete } from "@react-google-maps/api";
import OriginMarker from "../../assets/origin-icon.svg";
import DestinationMarker from "../../assets/destination-icon.svg";
import WaypointMarker from "../../assets/waypoint-icon.svg";
import addIcon from "../../assets/add-icon.svg";
import { DirectionFormProps } from ".";

const DirectionFormBlock: React.FC<DirectionFormProps> = ({
    distance,
    duration,
    waypoints,
    showWaypointInput,
    error,
    originRef,
    destinationRef,
    handleWaypointPlaceChanged,
    handleAddStop,
    calculateRoute,
    
}) => {
    const renderWaypointInputs = () => {
        return waypoints.map((waypoint, index) => (
          <Autocomplete key={index} onPlaceChanged={() => handleWaypointPlaceChanged(index)}>
            <Input
            key={index}
              startEnhancer={<img src={WaypointMarker} alt="Waypoint Marker" />}
              type="text"
              placeholder={`Stop ${index + 1}`}
              handleInputRef={(ref: HTMLInputElement) =>{

                (waypoint.ref as React.MutableRefObject<HTMLInputElement | null>).current = ref;
              }

              }
            />
          </Autocomplete>
        ));
      };
  return (
    <div className="flex flex-col gap-20">
      <div className="flex gap-4 items-center  flex-col sm:flex-row">
        <div className="flex flex-col flex-1 gap-7 ">
          <div className="flex flex-col">
            <FormControl label="Origin">
              <Autocomplete>
                <Input
                  startEnhancer={<img src={OriginMarker} alt="Origin Marker" />}
                  type="text"
                  placeholder="Origin"
                  // ref={originRef}
                  handleInputRef={(ref: HTMLInputElement) =>
                    {(originRef as React.MutableRefObject<HTMLInputElement | null>).current = ref;}
                  }
                />
              </Autocomplete>
            </FormControl>
            {waypoints.length === 0 && (
              <button onClick={handleAddStop} className="self-end">
                <div className="flex flex-row gap-1">
                  <img src={addIcon} alt="Add Icon" />
                  Add a stop
                </div>
              </button>
            )}
          </div>
          {showWaypointInput && (
            <>
              {renderWaypointInputs()}
              <button onClick={handleAddStop} className="self-end">
                <div className="flex flex-row">
                  <img src={addIcon} alt="Add Icon" />
                  Add another stop
                </div>
              </button>
            </>
          )}
          {error && <div className="text-red-600">{error}</div>}
          <div>
            <FormControl label="Destination">
              <Autocomplete>
                <Input
                  type="text"
                  placeholder="Destination"
                  // ref={destinationRef}
                  handleInputRef={(ref: HTMLInputElement) =>
                    {(destinationRef as React.MutableRefObject<HTMLInputElement | null>).current = ref;}
                  }
                  startEnhancer={
                    <img src={DestinationMarker} alt="Destination Marker" />
                  }
                />
              </Autocomplete>
            </FormControl>
          </div>
        </div>
        <div className="flex flex-1 justify-center items-center">
          <button
            onClick={calculateRoute}
            className="bg-primary rounded-full px-8 py-5 font-semibold text-white hover:opacity-90"
          >
            Calculate
          </button>
        </div>
      </div>
      <RouteInfoBlock
        distance={distance}
        duration={duration}
        origin={originRef.current?.value}
        destination={destinationRef.current?.value}
      />
    </div>
  );
};

export default DirectionFormBlock;
