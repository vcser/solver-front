import { useState } from "react";
import CoordinatesInput from "./CoordinatesInput";

export default function CoordinatesContainer() {
    const [inputs, setInputs] = useState([{ id: 0 }]);

    const addInput = () => {
        setInputs([...inputs, { id: inputs.length }]);
    };

    const removeInput = (id) => {
        setInputs(inputs.filter(input => input.id !== id));
    };

    return (
        <div>
            <ul>
                {inputs.map(input => (
                    <CoordinatesInput key={input.id} onRemove={() => removeInput(input.id)} />
                ))}
            </ul>
            <button type="button" role="button" onClick={addInput}>➕</button>
        </div>
    );
}