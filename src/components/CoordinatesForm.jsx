import CoordinatesContainer from "./CoordinatesContainer";
import { fetchRestults } from "../utils/fetchResult";
import { useState } from "react";
import Spinner from "./ui/spinner";
import { dmsToDecimal } from "../utils/coordinates";

export default function CoordinatesForm({ setResults }) {
    const [disabled, setDisabled] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        setDisabled(true);
        setResults(null);

        const input = [];
        const count = document.querySelectorAll("[name^='degreesLat-']").length;

        for (let i = 0; i < count; i++) {
            const degreesLat = parseInt(formData.get(`degreesLat-${i}`));
            const minutesLat = parseInt(formData.get(`minutesLat-${i}`));
            const secondsLat = parseFloat(formData.get(`secondsLat-${i}`));

            const degreesLng = parseInt(formData.get(`degreesLng-${i}`));
            const minutesLng = parseInt(formData.get(`minutesLng-${i}`));
            const secondsLng = parseFloat(formData.get(`secondsLng-${i}`));

            const timestamp = formData.get(`timestamp-${i}`);

            const lat = dmsToDecimal(degreesLat, minutesLat, secondsLat);
            const lon = dmsToDecimal(degreesLng, minutesLng, secondsLng);

            input.push({ lat, lon, timestamp });
        }

        console.log(input)

        const prediction = await fetchRestults(input);
        console.log(prediction);

        setResults(prediction);
        setDisabled(false);
    }

    return (
        <>
            <h2 className="mb-4 text-2xl font-bold text-center">
                Ingresar Focos de Incendio
            </h2>
            <form
                className="flex flex-col items-center bg-slate-200 p-4 rounded-md overflow-visible"
                name="coordinates-form"
                onSubmit={handleSubmit}
            >
                <CoordinatesContainer />
                <button
                    disabled={disabled}
                    className="btn btn-lg bg-green-500"
                    type="submit"
                    data-testid="submit"
                >
                    {disabled
                        ? (
                            <div className="flex flex-row justify-center items-center">
                                <Spinner /> Analizando
                            </div>
                        )
                        : "Analizar 🔍"}
                </button>
            </form>
        </>
    );
}
