import { useState } from "react";
import CoordinatesInput from "./CoordinatesInput";
import { PlusIcon } from "@heroicons/react/24/outline";

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
            {/* Header de los inputs */}
            <div className="hidden md:visible md:flex flex-row justify-between text-center text-m font-semibold bg-gray-300 rounded-md w-full gap-2">
                <span className="w-[5%]">ID</span>
                <span className="w-[22%] min-w-[98px]" >{"Latitud (° ' \")"}</span>
                <span className="w-[22%] min-w-[93px]">{"Longitud (° ' \")"}</span>
                <span className="w-[31%] min-w-[108px]">Tiempo de inicio</span>
                <span className="text-gray-300 w-[20%]">A</span>
            </div>

            <div>
                {/* Lista de inputs */}
                <ul className="flex flex-col justify-between items-center">
                    {inputs.map((input) => (
                        <CoordinatesInput
                            key={input.id}
                            id={input.id}
                            onRemove={() => removeInput(input.id)}
                        />
                    ))}
                </ul>

                {/* Botón para agregar */}
                <button
                    className="btn btn-soft mt-1 mb-4 mx-auto md:mx-0 flex items-center gap-1"
                    type="button"
                    role="button"
                    onClick={addInput}
                >
                    Agregar foco <PlusIcon className="w-5" />
                </button>
            </div>

        </div>
    );
}
