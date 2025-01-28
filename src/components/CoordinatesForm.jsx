import CoordinatesContainer from "./CoordinatesContainer";

export default function CoordinatesForm() {
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }
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
