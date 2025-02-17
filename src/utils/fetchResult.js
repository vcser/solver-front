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

async function fetchRestults(coords) {
    const currentTime = formatTimestamp(new Date());
    const payload = {
        timestamp: currentTime,
        fires: coords.map((coord, idx) => ({
            id: idx,
            lat: coord.lat,
            lon: coord.lon,
            timestamp: coord.timestamp,
        })),
    };

    const response = await fetch(
        "https://firesolverproxy.vicentecser.workers.dev/prediction/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        },
    );

    const json = await response.json();

    return json;
}

export { fetchRestults };
