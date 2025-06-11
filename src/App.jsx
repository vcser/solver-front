import { useState } from "react";
import CoordinatesForm from "./components/CoordinatesForm";
import ResultsSection from "./components/ResultsSection";

export default function App() {
  const [results, setResults] = useState(null);
  const [selection, setSelection] = useState(null);

  return (
    <div className="w-full flex flex-col min-h-screen">
      <header className="p-4 text-align-center bg-green-600 text-white">
        <h1 className="text-xl font-bold">Recomendador de Despacho</h1>
      </header>
      <main className="flex flex-1 flex-col justify-center items-center flex-wrap">
        {/* Formulario */}
        <div className="w-full md:content lg:w-3/4 p-4">
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
      <footer className="p-4 bg-gray-200 text-center relative bottom-0 w-full">
        © 2025 CMPC
      </footer>
    </div>
  );
}
