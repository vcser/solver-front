function decimalToDMS(degrees) {
    const sign = degrees < 0 ? -1 : 1; // Guardamos el signo
    degrees = Math.abs(degrees); // Trabajamos con el valor absoluto

    const deg = Math.floor(degrees);
    const min = Math.floor((degrees - deg) * 60);
    let sec = parseFloat(((degrees - deg - min / 60) * 3600).toFixed(2));

    // Evita que los segundos sean 60.00 (ajusta los minutos en ese caso)
    if (sec === 60) {
        sec = 0;
        if (min === 59) {
            return { deg: sign * (deg + 1), min: 0, sec }; // Incrementa los grados
        }
        return { deg: sign * deg, min: min + 1, sec }; // Incrementa los minutos
    }

    return { deg: sign * deg, min, sec };
}

function dmsToDecimal(degrees, minutes, seconds) {
    const decimal = Math.abs(degrees) + minutes / 60 + seconds / 3600;
    return degrees < 0 ? -decimal : decimal;
}

export { decimalToDMS, dmsToDecimal };
