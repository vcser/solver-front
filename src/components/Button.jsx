// Componente: Button
export default function Button({ onClick }) {
    return (
        <button
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 transition duration-200"
            onClick={onClick}
        >
            Analizar
        </button>
    );
}