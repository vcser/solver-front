import { useState } from "react";
import CoordinatesForm from "./components/CoordinatesForm";
import ResultsSection from "./components/ResultsSection";

export default function App() {
  const [results, setResults] = useState(null);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-slate-100">
      <CoordinatesForm setResults={setResults} />
      {results ? <ResultsSection results={results} /> : ""}
    </div>
  );
}
