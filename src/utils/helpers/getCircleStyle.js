export const getCircleStyle = (obj) => {
    const criticalityMax = 6;
    const criticalityValue = obj.criticalityScore//Math.round(obj.criticalityScore / 10 * criticalityMax);
    let fillColor = "#32a852";
    let color = "blue";

    if (criticalityValue > 6) {
        fillColor = "#ff0000";
    } else if (criticalityValue > 4) {
        fillColor = "#ffff00";
    }
    //object type check
    if(obj.treesAmount) {
        color = "green";
    }

    return {
        radius: 1000,
        color,
        fillColor,
        fillOpacity: 0.5
    }
}