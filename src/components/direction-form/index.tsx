import React from 'react'
import DirectionFormLayout from './direction-form-layout'
import DirectionFormBlock from './direction-form-block'

export interface DirectionFormProps {
    distance: string | null;
    duration: string | null;
    waypoints: { ref: React.RefObject<HTMLInputElement>; value: string}[];
    showWaypointInput: boolean;
    error: string;
    originRef: React.RefObject<HTMLInputElement>;
    destinationRef: React.RefObject<HTMLInputElement>;
    handleWaypointPlaceChanged: (index: number) => void;
    handleAddStop: () => void;
    calculateRoute: () => void;
    }

const DirectionForm: React.FC<DirectionFormProps> = ({
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
  return (
    <DirectionFormLayout>
        <DirectionFormBlock 
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
    </DirectionFormLayout>
  )
}

export default DirectionForm
