// Función para cargar datos
const fetchData = async () => {
    const endpoint =
        "https://script.google.com/macros/s/AKfycbyjFwGmYWi7yu91HEOQBXzGNqf1SH2Qe8X_9ihrpFN4fiH_RX7ff0-6G-jG8T689RwKaA/exec";
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
};

export default fetchData;

async function fetchMeteorology(coords) {
    const lats = coords.map((coord) => coord.lat).join(",");
    const longs = coords.map((coord) => coord.long).join(",");
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${longs}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m`,
    );
    const json = await response.json();

    const data = json.map((d) => ({
        humidity: d.current.relative_humidity_2m,
        velocity: d.current.wind_speed_10m,
        temperature: d.current.temperature_2m,
        direction: d.current.wind_direction_10m,
    }));

    return data;
}

async function fetchGeography(coords) {
    // let response = await fetch(
    //     `http://chome.inf.udec.cl:8000/slope?lat=${lat}&lon=${long}`,
    // );
    // response = await response.json();
    // const slope = response.slope;

    // // paso 4: obtener modelo de combustible
    // response = await fetch(
    //     `http://chome.inf.udec.cl:8000/fuel-model?lat=${lat}&lon=${long}`,
    // );
    // response = await response.json();
    // const fuelModel = response.fuel_model;
    // const vpl_factor = response.vpl_factor;

    // // paso 5: obtener distancia a la zona poblada mas cercana
    // response = await fetch(
    //     `http://chome.inf.udec.cl:8000/nearest-populated-area?lat=${lat}&lon=${long}`,
    // );
    // response = await response.json();
    // const distance = response.distance_meters / 1000;

    const data = coords.map(async (coord) => {
        const response = await fetch(
            `http://chome.inf.udec.cl:8000/geography?lat=${coord.lat}&lon=${coordlong}`,
        );
        const json = response.json();

        return {
            slope: json.slope,
            fuelModel: json.fuel_model,
            vplFactor: parseFloat(json.vpl_factor),
            distance: json.distance_meters / 1000,
            valorXRodal: 3732,
        };
    });

    return data;
}

function fetchResources(coords) {
    // obtener datos de recursos junto con sus eta a cada foco
}

function formInputdata(coords) {
    const meteorology = fetchMeteorology(coords);
    const geography = fetchGeography(corrds);
    const resources = fetchResources(coords);

    const currentTime = new Date().toISOString().slice(0, 16);
    return `${currentTime}
    ${coords.length}
    ${
        coords.map((coord, idx) =>
            `${coord.lat} ${coord.long} ${meteorology[idx].humidity} ${
                meteorology[idx].velocity
            } ${meteorology[idx].direction} ${meteorology[idx].temperature} ${
                geography[idx].slope
            } ${geography[idx].vplFactor} ${coord.timestamp} ${
                geography[idx].valorXRodal
            } ${geography[idx].fuelModel} ${geography[idx].distance} 0`
        ).join("\n")
    }
    ${resources.length}
    ${
        resources.map((resource) =>
            `${resource.id} ${resource.type} ${resource.hours} ${resource.lat} ${resource.long} ${resource.state} ${resource.assigned} 1 ${
                resource.etas.join(" ")
            }`
        ).join("\n")
    }
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
    ${
        resources.map((resource) =>
            `${resource.id} ${"1 ".repeat(coords.length).trim()}`
        ).join("\n")
    }
`;
}
