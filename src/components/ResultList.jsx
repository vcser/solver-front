// Componente: ResultList
export default function ResultList({ result }) {
    if (result.length === 0) return null;
    return (
        <div className="mt-6">
            <h2 className="text-lg font-bold text-green-700">Despacho recomendado:</h2>
            <ul className="mt-2 bg-green-50 p-4 rounded-lg border border-green-300 divide-y divide-green-300">
                {result.map((item, index) => (
                    <li key={index} className="flex justify-between p-2">
                        <span className="text-left">{item.key}</span>
                        <span className="text-right">{item.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}