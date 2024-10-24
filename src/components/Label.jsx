// Componente: Label
export default function Label({ name, value }) {
    return (
        <div className="">
            <label className="block text-green-600 text-lg w-full pl-2 py-1">
                <b>{name}:</b> {value}
            </label>
        </div>
    );
}