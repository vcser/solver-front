// Función para cargar datos
const fetchData = async () => {
    const endpoint =
        "https://script.google.com/macros/s/AKfycbyjFwGmYWi7yu91HEOQBXzGNqf1SH2Qe8X_9ihrpFN4fiH_RX7ff0-6G-jG8T689RwKaA/exec";
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
};

export default fetchData;
