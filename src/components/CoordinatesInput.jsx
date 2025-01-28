import { useState } from "react";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapWithMarker({ position, setPosition }) {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    return position
        ? (
            <Marker position={position}>
            </Marker>
        )
        : null;
}

export default function CoordinatesInput({ onRemove }) {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [markerPosition, setMarkerPosition] = useState(null);

    const toggleMap = () => {
        setIsMapOpen(!isMapOpen);
        console.log("Toggle map");
    };

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
                required
                value={markerPosition?.lat}
            />
            <input
                inputMode="decimal"
                type="number"
                name="longitude"
                placeholder="Longitud"
                required
                value={markerPosition?.lng}
            />
            <input
                type="datetime-local"
                name="timestamp"
                role="time"
                required
            />
            <button type="button" role="button" onClick={onRemove}>❌</button>
            {isMapOpen && (
                <div role="navigation">
                    <MapContainer
                        center={markerPosition || [51.505, -0.09]}
                        zoom={13}
                        scrollWheelZoom={true}
                        style={{ height: "400px", width: "100%" }}
                        role="map"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapWithMarker
                            position={markerPosition}
                            setPosition={setMarkerPosition}
                        />
                    </MapContainer>
                </div>
            )}
        </li>
    );
}
