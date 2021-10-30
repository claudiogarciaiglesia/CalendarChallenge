export const toCelsius = (temperature) => {
    if (!temperature) return null;
    return Math.round((temperature - 32) * 5 / 9);
}