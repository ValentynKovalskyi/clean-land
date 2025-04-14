export const getCircleStyle = (criticality) => {
    const criticalityMax = 6;
    const criticalityValue = Math.round(criticality / 10 * criticalityMax);
    let color = "green";
    let fillColor = "#32a852";

    if (criticalityValue > 4) {
        color = "red";
        fillColor = "#ff0000";
    } else if (criticalityValue > 2) {
        color = "yellow";
        fillColor = "#ffff00";
    }

    return {
        radius: 1000,
        color,
        fillColor,
        fillOpacity: 0.5
    }
}