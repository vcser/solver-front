import { useRef, useState } from "react";
import { useEffect } from "react";
import MapPopover from "./mapPopover.jsx";
import { MapPinIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { decimalToDMS } from "../utils/coordinates.js";

export default function CoordinatesInput({ id, onRemove }) {
  const degreesLatRef = useRef();
  const minutesLatRef = useRef();
  const secondsLatRef = useRef();
  const degreesLngRef = useRef();
  const minutesLngRef = useRef();
  const secondsLngRef = useRef();
  const dateTimeRef = useRef();
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMapClick = (latlng) => {
    setMarkerPosition([latlng.lat, latlng.lng]);
    const { deg: dLat, min: mLat, sec: sLat } = decimalToDMS(latlng.lat);
    const { deg: dLng, min: mLng, sec: sLng } = decimalToDMS(latlng.lng);

    degreesLatRef.current.value = dLat;
    minutesLatRef.current.value = mLat;
    secondsLatRef.current.value = sLat.toFixed(0);

    degreesLngRef.current.value = dLng;
    minutesLngRef.current.value = mLng;
    secondsLngRef.current.value = sLng.toFixed(0);
  };

  useEffect(() => {
    const localDate = new Date();
    const localISOString = localDate.getFullYear() +
      "-" +
      String(localDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(localDate.getDate()).padStart(2, "0") +
      "T" +
      String(localDate.getHours()).padStart(2, "0") +
      ":" +
      String(localDate.getMinutes()).padStart(2, "0");
    dateTimeRef.current.value = localISOString;
  }, []);

  return (
    <li className="grid grid-cols-[15px_2fr_1fr] grid-rows-3 md:flex md:flex-row md:items-center gap-2 w-full p-2 border border-gray-300 rounded-md">
      {/*ID*/}
      <span className="font-semibold w-[5%] row-start-2 col-start-1">{id}</span>
      {/*Latitud*/}
      <div className="col-start-2 row-start-1 flex md:w-[22%] md:min-w-[98px]">
        <img
          src="https://cdn-icons-png.flaticon.com/512/992/992310.png"
          alt="latitud"
          className="object-contain ml-1 mr-3 w-4 md:hidden"
        />
        <input
          type="number"
          name={`degreesLat-${id}`}
          placeholder="°"
          ref={degreesLatRef}
          className="input w-full"
          required
        />
        <input
          type="number"
          name={`minutesLat-${id}`}
          placeholder="'"
          ref={minutesLatRef}
          className="input w-full"
          required
        />
        <input
          type="number"
          name={`secondsLat-${id}`}
          step="0.01"
          placeholder={'"'}
          ref={secondsLatRef}
          className="input w-full"
          required
        />
      </div>
      {/*Longitud*/}
      <div className="col-start-2 row-start-2 flex md:w-[22%] md:min-w-[93px]">
        <img
          src="https://cdn-icons-png.flaticon.com/512/992/992312.png"
          alt="latitud"
          className="object-contain ml-1 mr-3 w-4 md:hidden"
        />
        <input
          type="number"
          name={`degreesLng-${id}`}
          placeholder="°"
          ref={degreesLngRef}
          className="input w-full"
          required
        />
        <input
          type="number"
          name={`minutesLng-${id}`}
          placeholder="'"
          ref={minutesLngRef}
          className="input w-full"
          required
        />
        <input
          type="number"
          name={`secondsLng-${id}`}
          step="0.01"
          placeholder={'"'}
          ref={secondsLngRef}
          className="input w-full"
          required
        />
      </div>
      <div className="flex grow col-start-2 row-start-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4983/4983141.png"
          alt="latitud"
          className="object-contain ml-1 mr-3 w-4 md:hidden"
        />
        {/*Fecha*/}
        <input
          type="datetime-local"
          name={`timestamp-${id}`}
          ref={dateTimeRef}
          className="input w-full"
          required
        />
      </div>
      <div className="flex grow justify-center col-start-3 row-start-2 gap-1">
        {/*Mapa*/}
        <MapPopover
          markerPosition={markerPosition}
          setMarkerPosition={handleMapClick}
          className="w-[15%]"
        />
        {/*Addbutton*/}
        <button
          className="btn p-1 z-100 w-6"
          type="button"
          role="button"
          onClick={onRemove}
        >
          <XMarkIcon className="size-5" />
        </button>
      </div>
    </li>
  );
}
