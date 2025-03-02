function decimalToDMS(degrees) {
    const deg = Math.floor(degrees);
    const min = Math.floor((degrees - deg) * 60);
    const sec = ((degrees - deg - min / 60) * 3600).toFixed(2);

    return `${deg}° ${min}' ${sec}"`;
}

function dmsToDecimal(degrees, minutes, seconds) {
    const decimal = Math.abs(degrees) + minutes / 60 + seconds / 3600;
    return degrees < 0 ? -decimal : decimal;
}

export { decimalToDMS, dmsToDecimal };
