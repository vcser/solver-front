// Función para simular análisis
const simulateAnalysis = () => {
    return Array.from({ length: 12 }, (_, index) => ({
        key: `Recurso ${index + 1}`,
        value: Math.floor(Math.random() * (20 - 1 + 1)) + 1,
    }));
};

export default simulateAnalysis;
