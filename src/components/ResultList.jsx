// Componente: ResultList
export default function ResultList({ result }) {
    if (result.length === 0) return null;
    return (
        <div className="mt-6">
            <h2 className="text-lg font-bold text-green-700 mt-8">
                Despacho recomendado:
            </h2>

            {/* Tabla de los resultados */}
            <div className="mt-2 bg-green-50 p-4 rounded-lg border border-green-300">
                <table className="min-w-full table-auto">
                    <thead className="bg-green-100">
                        <tr>
                            <th className="px-4 py-2 text-left font-bold text-green-700">
                                Id Recurso
                            </th>
                            <th className="px-4 py-2 text-left font-bold text-green-700">
                                Metro Línea
                            </th>
                            <th className="px-4 py-2 text-left font-bold text-green-700">
                                Costo Recurso
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.resources.map((item, index) => (
                            <tr
                                key={index}
                                className="border-t border-green-200"
                            >
                                <td className="px-4 py-2">{item.id}</td>
                                <td className="px-4 py-2">{item.metroLinea}</td>
                                <td className="px-4 py-2">
                                    {item.costoRecurso}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mostrar las métricas sobre la tabla */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-300">
                <h3 className="text-lg font-semibold text-green-700">
                    Métricas:
                </h3>
                <div className="mt-4">
                    {Object.entries(result.metrics).map((
                        [key, value],
                        index,
                    ) => (
                        <div
                            key={index}
                            className="mb-2 p-2 rounded-lg bg-white shadow-md"
                        >
                            <div className="flex justify-between">
                                <span className="font-medium text-green-600">
                                    {key}:
                                </span>
                                <span className="font-light text-green-900 bg-green-200 px-3 rounded-md">
                                    {typeof value === "number"
                                        ? value.toLocaleString("es", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })//.replace(/,/g, " ")
                                        : value}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
