import { useState, useRef } from "react";
import MapSelector from "./MapSelector";

export default function CoordinatesInput({ onRemove }) {
    const latRef = useRef();
    const lngRef = useRef();
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [markerPosition, setMarkerPosition] = useState(null);

    const toggleMap = () => {
        setIsMapOpen(!isMapOpen);
        // console.log("Toggle map");
    };

    const handleMapClick = (latlng) => {
        setMarkerPosition([latlng.lat, latlng.lng]);
        latRef.current.value = parseFloat(latlng.lat).toFixed(6);
        lngRef.current.value = parseFloat(latlng.lng).toFixed(6);
    }

    return (
        <li>
            <button
                type="button"
                role="popover"
                data-testid="map-picker"
                onClick={toggleMap}
            >
                🗺️
            </button>
            <input
                inputMode="decimal"
                type="number"
                name="latitude"
                placeholder="Latitud"
                ref={latRef}
                step={0.000001}
                required
            />
            <input
                inputMode="decimal"
                type="number"
                name="longitude"
                placeholder="Longitud"
                ref={lngRef}
                step={0.000001}
                required
            />
            <input
                type="datetime-local"
                name="timestamp"
                role="time"
                required
            />
            <button type="button" role="button" onClick={onRemove}>❌</button>
            {isMapOpen && (
                <MapSelector markerPosition={markerPosition} setMarkerPosition={handleMapClick}/>
            )}
        </li>
    );
}
