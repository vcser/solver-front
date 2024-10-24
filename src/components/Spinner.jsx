// Componente: Spinner
export default function Spinner({ visible }) {
    if (!visible) return null;
    return (
        <div className="mt-6 text-center">
            <i className="fas fa-spinner fa-spin text-green-600 text-4xl"></i>
            <p className="text-green-600">Cargando...</p>
        </div>
    );
}