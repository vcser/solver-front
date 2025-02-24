import CoordinatesContainer from "./CoordinatesContainer";
import { fetchRestults } from "../utils/fetchResult";
import { useCallback, useState } from "react";
import Spinner from "./ui/spinner";

export default function CoordinatesForm({ setResults }) {
    const [disabled, setDisabled] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataArray = Array.from(formData.entries());

        setDisabled(true);
        setResults(null);

        const input = [];
        for (let i = 0; i < formDataArray.length; i += 3) {
            const lat = formDataArray[i][1];
            const lon = formDataArray[i + 1][1];
            const timestamp = formDataArray[i + 2][1];

            input.push({
                lat,
                lon,
                timestamp,
            });
        }

        const prediction = await fetchRestults(input);
        console.log(prediction);

        setResults(prediction);

        setDisabled(false);

        return true;
    }

    return (
        <form
            className="bg-slate-200 flex flex-col items-center p-4 rounded-md"
            name="coordinates-form"
            onSubmit={handleSubmit}
        >
            <CoordinatesContainer />
            <button
                disabled={disabled}
                className="btn btn-primary btn-lg"
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
    );
}
