import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapResize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

function ClickHandler({ setMarkerPosition }) {
  useMapEvents({
    click(e) {
      setMarkerPosition(e.latlng);
    },
  });
  return null;
}

export default function MapPopover({ markerPosition, setMarkerPosition }) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);
  // const [markerPosition, setMarkerPosition] = useState(null);

  // Hook para cerrar el popover al hacer clic fuera de él
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="flex justify-center items-center">
      <div className="relative" ref={popoverRef}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="btn bg-green-500"
        >
          Abrir Mapa
        </button>
        {open && (
          <div className="absolute top-full right-0 md:left-0 mt-2 z-50 bg-base-200 p-2 shadow-xl rounded-box w-80 pointer-events-auto">
            <div className="w-full h-full">
              <MapContainer
                center={markerPosition || [-37.47, -72.35]} // Los Ángeles, Chile
                zoom={14}
                className="h-64 w-72 rounded-lg pointer-events-auto"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapResize />
                <ClickHandler setMarkerPosition={setMarkerPosition} />
                {markerPosition && <Marker position={markerPosition} />}
              </MapContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
