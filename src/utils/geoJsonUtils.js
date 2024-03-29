export const calculatePerpendicularPoint = (point, nextPoint, distance) => {
    //console.log("point:" + point)
    //console.log("nextPoint:" + nextPoint)
    //console.log("distance:" + distance)

    // Simple approximation, assumes flat Earth for demonstration purposes
    const dy = nextPoint[1] - point[1];
    const dx = nextPoint[0] - point[0];
    const angle = Math.atan2(dy, dx) + Math.PI / 2; // Perpendicular to path segment
    // Calculate offsets
    const offsetX = distance * Math.cos(angle);
    const offsetY = distance * Math.sin(angle);

    return [
        [point[0] + offsetX, point[1] + offsetY], // Left
        [point[0] - offsetX, point[1] - offsetY]  // Right
    ];
}

export const createGeoJSONPath = (path, magnitudes, widthScale = 2) => {
    const leftSide = [];
    const rightSide = [];

    path.forEach((point, i) => {
        if (i < path.length - 1) {
            const nextPoint = path[i + 1];
            const width = Math.pow((magnitudes[i].value / 100), widthScale);
            const [leftPoint, rightPoint] = calculatePerpendicularPoint(point, nextPoint, width);

            leftSide.push(leftPoint);
            rightSide.unshift(rightPoint); // Add to the beginning for a reversed order
        }
    });

    // Combine to form a polygon
    const polygonCoordinates = [[...leftSide, ...rightSide, leftSide[0]]]; // Close the loop
    const fc = {
        type: "FeatureCollection",
        features: [{
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: polygonCoordinates
            },
            properties: {}
        }]
    };
    
    return fc;
}
