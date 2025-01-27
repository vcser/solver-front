function formatTimestamp(date) {
    if (!(date instanceof Date)) {
        throw new Error("La entrada debe ser un objeto Date válido.");
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function reemplazarTildes(texto) {
    const mapaTildes = {
        á: "a",
        é: "e",
        í: "i",
        ó: "o",
        ú: "u",
        Á: "A",
        É: "E",
        Í: "I",
        Ó: "O",
        Ú: "U",
        ñ: "n",
        Ñ: "N",
    };

    return texto.replace(/[áéíóúÁÉÍÓÚñÑ]/g, (letra) => mapaTildes[letra]);
}

export const handleAnalysis = async (data) => {
    // paso 1: obtener estacion meteorologica mas cercana
    let response = await fetch(
        `http://chome.inf.udec.cl:8000/nearest-station?lat=${data.latitud}&lon=${data.longitud}`,
    );
    response = await response.json();
    const station = reemplazarTildes(response.station.name);
    console.log(station);

    // paso 2: obtener datos de la estacion meteorologica
    response = await fetch(
        `https://script.google.com/macros/s/AKfycbz4_3Tm3mfdsoj5kJtlMq2mFQ5ohYxstUVEicpn04oftYKX9E1kglRzQ6I9oYUn77Dh/exec?station=${station}`,
    );
    const weatherData = await response.json();
    console.log(weatherData);

    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "text/plain",
    };

    // paso 3: obtener pendiente
    response = await fetch(`http://chome.inf.udec.cl:8000/slope?lat=${data.latitud}&lon=${data.longitud}`);
    response = await response.json();
    const slope = response.slope;

    // paso 4: obtener modelo de combustible
    response = await fetch(`http://chome.inf.udec.cl:8000/fuel-model?lat=${data.latitud}&lon=${data.longitud}`);
    response = await response.json();
    const fuelModel = response.fuel_model;
    const vpl_factor = response.vpl_factor;
    console.log(fuelModel);

    // paso 5: obtener distancia a la zona poblada mas cercana
    response = await fetch(`http://chome.inf.udec.cl:8000/nearest-populated-area?lat=${data.latitud}&lon=${data.longitud}`);
    response = await response.json();
    const distance = response.distance_meters / 1000;

    // paso 6: enviar datos a la API de predicciones
    const currentTime = formatTimestamp(new Date());
    const bodyContent = `${currentTime}
1
${data.latitud} ${data.longitud}
${weatherData.hum} ${weatherData.vel} ${weatherData.dir} ${weatherData.temp} ${slope} ${parseFloat(vpl_factor)} ${data.inicio} 3732 ${fuelModel} ${distance} 0
24
811 Interfaz 2.8 -72.69277777777778 -37.522777777777776 1 -1 1 2021-01-18T15:27
KC8841 MECANIZADA 6.3 -37.522777777777776 -72.69277777777778 1 -1 1 2021-01-18T18:24
Z3 CISTERNAAEREA 2.0 -72.42416666666666 -37.39333333333333 1 -1 1 2021-01-18T14:33
Z5 CISTERNAAEREA 2.0 -72.6863888888889 -37.79611111111111 1 -1 1 2021-01-18T14:26
Z6 CISTERNAAEREA 1.9 -72.6863888888889 -37.79611111111111 1 -1 1 2021-01-18T14:25
Z8 CISTERNAAEREA 1.0 -72.42416666666666 -37.39333333333333 1 -1 1 2021-01-18T14:33
Z9 CISTERNAAEREA 2.9 -72.6863888888889 -37.79611111111111 1 -1 1 2021-01-18T14:24
314 HELITRANSPORTADA 3.5 -72.42333333333333 -37.39222222222222 1 -1 1 2021-01-18T14:40
512 HELITRANSPORTADA 4.8 -72.63055555555555 -37.759166666666665 1 -1 1 2021-01-18T14:26
517 HELITRANSPORTADA 5.3 -72.73861111111111 -37.79083333333333 1 -1 1 2021-01-18T14:28
612 HELITRANSPORTADA 7.0 -72.41888888888889 -37.94083333333333 1 -1 1 2021-01-18T14:31
319 MECANIZADA 6.9 -72.62444444444444 -37.51305555555555 1 -1 1 2021-01-18T15:09
3110 TERRESTRE 8.4 -72.69277777777778 -37.522777777777776 1 -1 1 2021-01-18T15:26
316 TERRESTRE 13.8 -73.21944444444445 -38.01027777777778 1 -1 1 2021-01-18T16:57
613 TERRESTRE 16.7 -72.26444444444445 -37.72972222222222 1 -1 1 2021-01-18T15:42
614 TERRESTRE 7.3 -72.41888888888889 -37.94083333333333 1 -1 1 2021-01-18T15:05
712 TERRESTRE 7.1 -72.94916666666667 -38.74805555555556 1 -1 1 2021-01-18T14:52
AGF13 TERRESTRE 11.8 -37.522777777777776 -72.69277777777778 1 -1 1 2021-01-18T15:54
CER84 TERRESTRE 1.7 -37.522777777777776 -72.69277777777778 1 -1 1 2021-01-18T14:28
SER44 TERRESTRE 4.6 -37.522777777777776 -72.69277777777778 1 -1 1 2021-01-18T14:54
W10 CISTERNAAEREA 4.2 -72.6863888888889 -37.79611111111111 1 -1 1 2021-01-18T14:23
W6 CISTERNAAEREA 3.9 -72.42472222222223 -37.39388888888889 1 -1 1 2021-01-18T14:42
W8 CISTERNAAEREA 5.3 -72.63055555555555 -37.759166666666665 1 -1 1 2021-01-18T14:28
W9 CISTERNAAEREA 3.2 -72.41333333333334 -37.13777777777778 1 -1 1 2021-01-18T14:43
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
176.6666667 176.6666667 176.6666667 530 441.6666667 441.6666667 441.6666667
4988 14
30 14
37 21
103 83
4204 4204
53663 53663
4204 4204
811 1 1
KC8841 1 1
Z3 1 1
Z5 1 1
Z6 1 1
Z8 1 1
Z9 1 1
314 1 1
512 1 1
517 1 1
612 1 1
319 1 1
3110 1 1
316 1 1
613 1 1
614 1 1
712 1 1
AGF13 1 1
CER84 1 1
SER44 1 1
W10 1 1
W6 1 1
W8 1 1
W9 1 1`;

    response = await fetch("http://chome.inf.udec.cl:8000/predict", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
    });

    const result = await response.json();
    console.log(result);
    return result;
};
