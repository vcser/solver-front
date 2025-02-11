import { useState } from "react";
import CoordinatesForm from "./components/CoordinatesForm";
import ResultsSection from "./components/ResultsSection";

export default function App() {
  const [results, setResults] = useState(null);
  const [selection, setSelection] = useState(null);
  // return (
  //   <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-slate-100">
  //     <CoordinatesForm setResults={setResults} />
  //     {results ? <ResultsSection results={results} /> : ""}
  //   </div>
  // );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">Recomendador de Despacho</h1>
      </header>
      <main className="flex flex-1 flex-col md:flex-row">
        {/* Formulario */}
        <div className="w-full md:w-1/3 p-4">
          <CoordinatesForm setResultados={setResults} />
        </div>
        {/* Resultados */}
        <div className="w-full md:w-2/3 p-4">
          {results?.length > 0 && (
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
