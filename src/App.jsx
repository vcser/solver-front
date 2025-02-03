import { useState } from "react";
import CoordinatesForm from "./components/CoordinatesForm";
import ResultsSection from "./components/ResultsSection";

export default function App() {
  const [results, setResults] = useState({});
  return (
    <div>
      <CoordinatesForm setResults={setResults} />
      <ResultsSection results={results} />
    </div>
  );
}
