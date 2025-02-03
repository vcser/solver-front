export default function ResultsSection({ results }) {
    return (
        <section>
            {results.metrics
                ? (
                    <>
                        <h1>Metrics:</h1>
                        <p>
                            Patrimonio perdido: {results
                                .metrics["PatrimonioUSD Perdido"]}
                        </p>
                        <p>
                            Patrimonio salvado: {results
                                .metrics["PatrimonioUSD Salvado"]}
                        </p>
                        <p>Area quemada: {results.metrics.AreaQuemada}</p>
                        <p>Perimetro: {results.metrics.Perimetro}</p>
                        <p>
                            Tiempo de apagado: {results
                                .metrics["Tiempo Apagado (h)"]}
                        </p>
                        <h1>Recursos:</h1>
                        <ul>
                            {results.resources.map((resource) => (
                                <li key={resource.id}>
                                    <p>Id: {resource.id}</p>
                                    <p>Metros de linea: {resource.metroLinea}</p>
                                    <p>Costo: {resource.costoRecurso}</p>
                                </li>
                            ))}
                        </ul>
                    </>
                )
                : "Aun no hay resultados"}
        </section>
    );
}
