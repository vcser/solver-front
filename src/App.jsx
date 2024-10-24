function App() {

  return (
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-green-200">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full my-8">
        {/* <!-- Logo de la Empresa --> */}
        <div class="mb-6 text-center">
          <img src="https://www.cmpc.com/assets/themes/cmpc/assets/img/logo-cmpc.svg" alt="CMPC Logo" class="mx-auto h-20 w-auto" />
        </div>

        <h1 class="text-center text-3xl font-extrabold text-green-700 mb-6">Recomendador de despacho</h1>

        {/* <!-- Input fundo amenazado --> */}
        <div class="mb-4">
          <label class="block text-green-600 text-lg" for="codpredio">Fundo Amenazado</label>
          <input class="mt-1 block w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring focus:ring-green-500" list="FundosCMPC" id="codpredio" name="codpredio" onchange="actualizarInfo(this)" />
          <datalist id="FundosCMPC"></datalist>
        </div>

        {/* <!-- Prioridad --> */}
        <div class="mb-4">
          <label id="Prioridad" class="block text-green-600 text-lg w-full p-3" for="codpredio">Prioridad: </label>
        </div>

        {/* <!-- Boton de enviar datos --> */}
        <button id="submitButton" class="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 transition duration-200">Analizar</button>

        {/* <!-- Contenedor para el spinner --> */}
        <div id="spinner" class="mt-6 hidden text-center">
          <i class="fas fa-spinner fa-spin text-green-600 text-4xl"></i>
          <p class="text-green-600">Cargando...</p>
        </div>

        {/* <!-- Contenedor para la lista --> */}
        <div id="resultList" class="mt-6 hidden">
          <h2 class="text-lg font-bold text-green-700">Despacho recomendado:</h2>
          <ul id="list" class="mt-2 bg-green-50 p-4 rounded-lg border border-green-300 divide-y divide-green-300"></ul>
        </div>
      </div>
    </div>
  )
}

export default App
