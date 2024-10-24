import { useEffect, useState } from "react";
import Header from "./components/Header";
import FundoInput from "./components/FundoInput";
import Label from "./components/Label";
import Button from "./components/Button";
import Spinner from "./components/Spinner";
import ResultList from "./components/ResultList";
import fetchData from "./utils/fetchData";
import simulateAnalysis from "./utils/simulateAnalysis";
import InfoList from "./components/InfoList";

export default function App() {
  const [data, setData] = useState([]);
  const [prioridad, setPrioridad] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [restriccion, setRestriccion] = useState("");
  const [alerta, setAlerta] = useState({name: "Verde", color: "green"})

  useEffect(() => {
    fetchData()
      .then(data => setData(data))
      .catch(error => console.error("Error al cargar datos:", error));
  }, []);

  const handleAnalysis = () => {
    setLoading(true);
    setResult([]);

    setTimeout(() => {
      const simulatedResult = simulateAnalysis();
      setResult(simulatedResult);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-green-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full my-8">
        <Header />
        <FundoInput data={data} setPrioridad={setPrioridad} setRestriccion={setRestriccion} />
        <InfoList>
          <Label name="Prioridad" value={prioridad} />
          <Label name="Restriccion" value={restriccion} />
          <Label name="Estado de alerta" value={<span className={"text-" + alerta.color + "-500" + " font-extrabold"}>{alerta.name}</span>} />
        </InfoList>
        <Button onClick={handleAnalysis} />
        <Spinner visible={loading} />
        <ResultList result={result} />
      </div>
    </div>
  );
}
