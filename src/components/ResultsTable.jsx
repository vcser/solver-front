export default function ResultsTable({ fire }) {
    return (
        <div className="flex flex-row items-center justify-center gap-12">
            <table>
                <thead>
                    <tr className="*:px-20 bg-slate-200">
                        <th>Metrica</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(fire.metrics).map((
                        [key, value],
                    ) => {
                        const displayNames = {
                                "area": "Area (ha)",
                                "perimeter": "Perimetro (m)",
                                "damage": "Patrimonio perdido (USD)",
                                "savedDamage": "Patrimonio salvado (USD)",
                                "extinguishedTime": "Tiempo de apagado (h)",
                        }
                        return (<tr key={key}>
                            <td align="left">{displayNames[key]}</td>
                            <td align="right">{parseFloat(value).toFixed(2)}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <table>
                <thead className="bg-slate-200">
                    <tr className="*:px-4">
                        <th>Nombre</th>
                        <th>Metros de linea</th>
                        <th>Costo aproximado</th>
                    </tr>
                </thead>
                <tbody>
                    {fire.resources.map((resource) => (
                        <tr
                            align="center"
                            key={resource.id}
                        >
                            <td>{resource.name}</td>
                            <td>
                                {parseFloat(resource.line).toFixed(
                                    1,
                                )}
                            </td>
                            <td>{resource.cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
