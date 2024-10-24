export default function FundoInput({ data, setPrioridad, setRestriccion }) {
  const actualizarInfo = (e) => {
    const selectedOption = data.find((fundo) => fundo[2] === e.target.value);
    if (selectedOption) {
      setPrioridad(selectedOption[4]);
      setRestriccion(selectedOption[5]);
    } else {
      setPrioridad("");
      setRestriccion("");
    }
  };

  return (
    <div className="mb-2 mt-10">
      <label className="block text-green-600 text-lg" htmlFor="codpredio">
        Fundo Amenazado
      </label>
      <input
        className="mt-1 block w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
        list="FundosCMPC"
        id="codpredio"
        name="codpredio"
        onChange={actualizarInfo}
      />
      <datalist id="FundosCMPC">
        {data.map((fundo, index) => (
          <option key={index} value={fundo[2]}>
            Área: {fundo[6]}, Comuna: {fundo[3]}, Región: {fundo[13]}
          </option>
        ))}
      </datalist>
    </div>
  );
}
