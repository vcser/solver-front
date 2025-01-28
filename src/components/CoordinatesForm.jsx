import CoordinatesContainer from "./CoordinatesContainer";

export default function CoordinatesForm() {
    function handleSubmit(formData) {
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }
    }

    return (
        <form action={handleSubmit} name="coordinates-form">
            <CoordinatesContainer />
            <button type="submit" data-testid="submit">Submit</button>
        </form>
    );
}
