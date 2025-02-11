import { useState } from "react";
import CoordinatesInput from "./CoordinatesInput";

export default function CoordinatesContainer() {
    const [inputs, setInputs] = useState([{ id: 0 }]);

    const addInput = () => {
        setInputs([...inputs, { id: inputs.length }]);
    };

    const removeInput = (id) => {
        setInputs(inputs.filter((input) => input.id !== id));
    };

    return (
        <div className="flex flex-col items-center mb-5">
            <ul className="flex flex-col items-center gap-1">
                {inputs.map((input) => (
                    <CoordinatesInput
                        key={input.id}
                        id={input.id}
                        onRemove={() => removeInput(input.id)}
                    />
                ))}
            </ul>
            <button
                className="btn btn-soft"
                type="button"
                role="button"
                onClick={addInput}
            >
                <span>➕</span>
            </button>
        </div>
    );
}
