import { useRef, useState } from "react";
import MapSelector from "./MapSelector";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function CoordinatesInput({ id, onRemove }) {
    const latRef = useRef();
    const lngRef = useRef();
    const [markerPosition, setMarkerPosition] = useState(null);

    const handleMapClick = (latlng) => {
        setMarkerPosition([latlng.lat, latlng.lng]);
        latRef.current.value = parseFloat(latlng.lat).toFixed(6);
        lngRef.current.value = parseFloat(latlng.lng).toFixed(6);
    };

    return (
        <li className="group">
            <span>{id}:</span>
            <Popover>
                <PopoverTrigger className="w-8 mx-1 drop-shadow bg-slate-50 hover:bg-slate-200 hover:cursor-pointer active:bg-slate-300 rounded-full" data-testid="map-picker">
                    🌎
                </PopoverTrigger>
                <PopoverContent>
                    <MapSelector
                        markerPosition={markerPosition}
                        setMarkerPosition={handleMapClick}
                    />
                </PopoverContent>
            </Popover>
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
                value={new Date().toISOString().slice(0, 16)}
                required
            />
            <button
                className="opacity-0 grayscale-100 hover:grayscale-0 hover:cursor-pointer hover:bg-slate-300 group-hover:opacity-100 transition-opacity duration-300"
                type="button"
                role="button"
                onMouseUp={onRemove}
            >
                ❌
            </button>
        </li>
    );
}
