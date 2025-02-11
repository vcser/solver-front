import { useRef, useState } from "react";
import MapSelector from "./MapSelector";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { DropDown, DropDownContent, DropDownTrigger } from "./ui/dropdown";
import { useEffect } from "react";

export default function CoordinatesInput({ id, onRemove }) {
    const latRef = useRef();
    const lngRef = useRef();
    const dateTimeRef = useRef();
    const [markerPosition, setMarkerPosition] = useState(null);
    const dropdownRef = useRef(null);

    const handleMapClick = (latlng) => {
        setMarkerPosition([latlng.lat, latlng.lng]);
        latRef.current.value = parseFloat(latlng.lat).toFixed(6);
        lngRef.current.value = parseFloat(latlng.lng).toFixed(6);
    };

    useEffect(() => {
        const localDate = new Date();

        // Ajustamos la fecha para que se muestre correctamente en la zona horaria local
        const localISOString = localDate.getFullYear() +
            "-" + String(localDate.getMonth() + 1).padStart(2, "0") +
            "-" + String(localDate.getDate()).padStart(2, "0") +
            "T" + String(localDate.getHours()).padStart(2, "0") +
            ":" + String(localDate.getMinutes()).padStart(2, "0");

        dateTimeRef.current.value = localISOString;
    }, []);

    return (
        <li className="group flex">
            <span>{id}:</span>
            <DropDown>
                <DropDownTrigger>🌎</DropDownTrigger>
                <DropDownContent ref={dropdownRef} data-testid="map-dropdown">
                    <MapSelector
                        markerPosition={markerPosition}
                        setMarkerPosition={handleMapClick}
                        dropdownRef={dropdownRef}
                    />
                </DropDownContent>
            </DropDown>
            <input
                inputMode="decimal"
                type="number"
                name="latitude"
                placeholder="Latitud"
                ref={latRef}
                step={0.000001}
                className="input"
                required
            />
            <input
                inputMode="decimal"
                type="number"
                name="longitude"
                placeholder="Longitud"
                ref={lngRef}
                step={0.000001}
                className="input"
                required
            />
            <input
                type="datetime-local"
                name="timestamp"
                role="time"
                ref={dateTimeRef}
                className="input"
                required
            />
            <button
                className="btn"
                type="button"
                role="button"
                onMouseUp={onRemove}
            >
                ❌
            </button>
        </li>
    );
}
