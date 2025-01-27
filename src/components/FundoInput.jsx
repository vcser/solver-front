export default function FundoInput({ data, setData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Actualizar solo el campo correspondiente en el objeto data
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="mb-2 mt-10">
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block text-green-600 text-lg" htmlFor="latitud">
            Latitud
          </label>
          <input
            className="mt-1 block w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
            id="latitud"
            name="latitud" // Asegúrate de que este nombre coincida con la clave en el objeto data
            type="number"
            value={data.latitud || ""} // Renderizar el valor actual del campo desde el estado
            onChange={handleInputChange} // Manejar cambios
          />
        </div>
        <div className="w-1/2">
          <label className="block text-green-600 text-lg" htmlFor="longitud">
            Longitud
          </label>
          <input
            className="mt-1 block w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
            id="longitud"
            name="longitud"
            type="number"
            value={data.longitud || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-green-600 text-lg" htmlFor="inicio">
          Timestamp inicio incendio
        </label>
        <input
          className="mt-1 block w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
          id="inicio"
          name="inicio"
          type="datetime-local"
          value={data.inicio || ""}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
