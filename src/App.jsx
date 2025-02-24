import { useState } from "react";
import CoordinatesForm from "./components/CoordinatesForm";
import ResultsSection from "./components/ResultsSection";

export default function App() {
  const [results, setResults] = useState(null);
  const [selection, setSelection] = useState(null);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">Recomendador de Despacho</h1>
      </header>
      <main className="flex flex-1 flex-col md:flex-row">
        {/* Formulario */}
        <div className="w-full md:w-1/2 p-4">
          <CoordinatesForm setResults={setResults} />
        </div>
        {/* Resultados */}
        <div className="w-full md:w-1/2 p-4">
          {results && (
            <ResultsSection
              results={results}
              selection={selection}
              setSelection={setSelection}
            />
          )}
        </div>
      </main>
      <footer className="p-4 bg-gray-200 text-center">
        © 2025 FireSolver
      </footer>
    </div>
  );
}
