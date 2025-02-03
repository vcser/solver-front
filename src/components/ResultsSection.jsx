export default function ResultsSection({ results }) {
    return (
        <section>
            {results.metrics
                ? (
                    <div>
                        <table>
                            <tr>
                                <th>Metrica</th>
                                <th>Valor</th>
                            </tr>
                            {Object.entries(results.metrics).map((
                                [key, value],
                            ) => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </table>
                        <table>
                            <tr>
                                <th>Id</th>
                                <th>Metros de linea</th>
                                <th>Costo aproximado</th>
                            </tr>
                            {results.resources.map((resource) => (
                                <tr key={resource.id}>
                                    <td>{resource.id}</td>
                                    <td>{resource.metroLinea}</td>
                                    <td>{resource.costoRecurso}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                )
                : "Aun no hay resultados"}
        </section>
    );
}
