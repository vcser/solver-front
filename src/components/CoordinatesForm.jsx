import CoordinatesContainer from "./CoordinatesContainer";
import { formInputdata, getPrediction } from "../utils/fetchData";
import { useState } from "react";
import Spinner from "./ui/spinner";

export default function CoordinatesForm({ setResults }) {
    const [disabled, setDisabled] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataArray = Array.from(formData.entries());

        setDisabled(true);
        setResults(null);

        const result = [];
        for (let i = 0; i < formDataArray.length; i += 3) {
            const lat = formDataArray[i][1];
            const long = formDataArray[i + 1][1];
            const timestamp = formDataArray[i + 2][1];

            result.push({
                lat,
                long,
                timestamp,
            });
        }

        const [data, resources] = await formInputdata(result);
        console.log(data);
        console.log(resources);

        const prediction = await getPrediction(data);

        prediction.fires.forEach((fire) => {
            fire.resources = fire.resources.map((resource) => ({
                name: resources.find((res) => res.id == parseInt(resource.id)).name,
                ...resource,
            }));
        });

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
                        className="bg-slate-100 w-48 h-12 rounded drop-shadow disabled:bg-slate-300 disabled:cursor-wait hover:bg-slate-200 hover:cursor-pointer active:bg-slate-300 transition-all duration-200"
                        type="submit"
                        data-testid="submit"
                    >
                        {disabled ? (<div className="flex flex-row justify-center items-center">Analizando <Spinner /></div>) : "Analizar 🔍"}
                    </button>
        </form>
    );
}
