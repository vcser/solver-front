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
        <div className="flex flex-col items-center">
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
                className="my-4 w-20 h-8 rounded-md hover:cursor-pointer bg-slate-100 drop-shadow-xs hover:bg-slate-200 active:bg-slate-300 transition-all duration-300"
                type="button"
                role="button"
                onClick={addInput}
            >
                <span>➕</span>
            </button>
        </div>
    );
}
