import {
    MapContainer,
    Marker,
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

export default function MapSelector({ markerPosition, setMarkerPosition }) {
    return (
        <div role="navigation" onClick={(e) => e.stopPropagation()}>
            <MapContainer
                center={markerPosition || [-37.38997332696627, -72.35919919536599]}
                zoom={11}
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
    );
}
