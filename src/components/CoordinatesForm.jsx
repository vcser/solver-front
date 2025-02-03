import CoordinatesContainer from "./CoordinatesContainer";
import { formInputdata, getPrediction } from "../utils/fetchData";

export default function CoordinatesForm({ setResults }) {
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataArray = Array.from(formData.entries());

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

        const data = await formInputdata(result);
        console.log(data)

        const prediction = await getPrediction(data);
        console.log(prediction);

        setResults(prediction);

        return true;
    }

    return (
        <form
            name="coordinates-form"
            onSubmit={handleSubmit}
        >
            <CoordinatesContainer />
            <button type="submit" data-testid="submit">Submit</button>
        </form>
    );
}
