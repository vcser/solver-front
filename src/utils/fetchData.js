async function fetchMeteorology(coords) {
    const lats = coords.map((coord) => coord.lat).join(",");
    const longs = coords.map((coord) => coord.long).join(",");
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${longs}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m`,
    );
    let json = await response.json();
    json = Array.isArray(json) ? json : [json];

    const data = json.map((d) => ({
        humidity: d.current.relative_humidity_2m,
        velocity: d.current.wind_speed_10m,
        temperature: d.current.temperature_2m,
        direction: d.current.wind_direction_10m,
    }));

    return data;
}

async function fetchGeography(coords) {
    const data = await Promise.all(
        coords.map(async (coord) => {
            const response = await fetch(
                `http://chome.inf.udec.cl:8000/geography?lat=${coord.lat}&lon=${coord.long}`,
            );
            const json = await response.json();

            return {
                slope: json.slope,
                fuelModel: json.fuel_model,
                vplFactor: parseFloat(json.vpl_factor),
                distance: json.distance_meters_to_populated_area / 1000,
                valorXRodal: 3732,
            };
        }),
    );

    return data;
}

async function fetchResources(coords) {
    return [{
        id: 811,
        type: "Interfaz",
        hours: 2.8,
        lat: -72.69277777777778,
        long: -37.522777777777776,
        state: 1,
        assigned: -1,
        etas: ["2021-01-18T15:27"],
    }];
}

const matrizEficiencia = `
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
`;

async function formInputdata(coords) {
    const meteorology = await fetchMeteorology(coords);
    const geography = await fetchGeography(coords);
    const resources = await fetchResources(coords);

    // console.log(meteorology);
    // console.log(geography);

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
                resource.etas.join(" ").trim()
            }`
        ).join("\n")
    }
${matrizEficiencia}
4988 14
30 14
37 21
103 83
4204 4204
53663 53663
4204 4204
${
        coords.map((coord, idx) =>
            resources.map((resource) => `${resource.id} ${idx + 1} 1`).join(
                "\n",
            )
        ).join("\n")
    }
`;
}

async function getPrediction(input) {
    const response = await fetch("http://chome.inf.udec.cl:8000/predict", {
        method: "POST",
        body: input,
    });
    const json = await response.json();
    return json;
}

export { fetchGeography, fetchMeteorology, fetchResources, formInputdata, getPrediction };
