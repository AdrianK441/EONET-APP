import axios from 'axios';
import { PathLayer, GeoJsonLayer, IconLayer, ScatterplotLayer } from '@deck.gl/layers';
import { scaleLinear } from 'd3-scale';
import { createGeoJSONPath } from './geoJsonUtils'
import HurricanSVG from '../icons/hurricaneIcon.svg'


const svgString = `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg fill="#000000" width="201px" height="201px" viewBox="-2.4 -2.4 28.80 28.80" id="hurricane" xmlns="http://www.w3.org/2000/svg">
<g id="SVGRepo_bgCarrier" stroke-width="0"/>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.384"/>
<g id="SVGRepo_iconCarrier">
<path id="primary" d="M8,12a9,9,0,0,1,9-9" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width:1.536;"/>
<path id="primary-2" data-name="primary" d="M12,8a9,9,0,0,1,9,9" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width:1.536;"/>
<path id="primary-3" data-name="primary" d="M16,12a9,9,0,0,1-9,9" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width:1.536;"/>
<path id="primary-4" data-name="primary" d="M12,16A9,9,0,0,1,3,7" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width:1.536;"/>
<path id="primary-5" data-name="primary" d="M9.17,14.83A9,9,0,0,1,6.6,7.5" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width:1.536;"/>
<path id="primary-6" data-name="primary" d="M14.83,14.83A9,9,0,0,1,7.5,17.4" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width:1.536;"/>
<path id="primary-7" data-name="primary" d="M14.83,9.17A9,9,0,0,1,17.4,16.5" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width:1.536;"/>
<path id="primary-8" data-name="primary" d="M9.17,9.17A9,9,0,0,1,16.5,6.6" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width:1.536;"/>
<circle id="secondary" cx="12" cy="12" r="4" style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width:1.536;"/>
</g>
</svg>`;

function svgToDataURL(svg) {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }
  

const colorScale = scaleLinear()
  .domain([-200, 1600, 3245]) // Data value range
  .range([
    [0, 255, 0],
    [0, 0, 255],
    [255, 0, 0] // Red for maxValue
  ])
  .clamp(true); // Clamps the output value to ensure it's within the range
  
const colorScaleMagnitude = scaleLinear().domain([35, 100, 170]) // Data value range
  .range([
    [120, 0, 200],
    [230, 188, 39],
    [255, 0, 0] 
  ])
  .clamp(true); // Clamps the output value to ensure it's within the range
  
  export const callHurricaneLayer = (dateObj, type) => {
    const year = dateObj.getFullYear();
    const month = `${dateObj.getMonth() + 1}`.padStart(2, '0'); 
    const day = `${dateObj.getDate()}`.padStart(2, '0');
    const formattedDate = `${year}/${month}/${day}`;

    // Return the axios promise
    return axios.get(`http://127.0.0.1:8000/hurricane-map/${formattedDate}/`)
        .then(response => {
            const hurricanePathsData = response.data.hurricane_paths;
            const pathSegments = []; // Store each segment as an individual path for the PathLayer
            console.log(hurricanePathsData)
            // Initialize an empty FeatureCollection
            let featureCollection = {
                type: "FeatureCollection",
                features: []
            };
  
            // Generate GeoJSON features for each hurricane
            hurricanePathsData.forEach(hurricane => {
                // Adapt createGeoJSONPath to accept a hurricane object and return a GeoJSON Feature
                const geoJsonFeature = createGeoJSONPath(hurricane.path, hurricane.magnitudes);
                featureCollection.features.push(...geoJsonFeature.features); // Assuming each call returns a FeatureCollection
            });
  
            // Create a GeoJsonLayer with the compiled FeatureCollection
            const geoJsonLayer = new GeoJsonLayer({
                id: 'geojson-layer',
                data: featureCollection,
                stroked: true,
                filled: true,
                lineWidthScale: 20,
                lineWidthMinPixels: 2,
                getFillColor: [100, 100, 200, 80],
                getLineColor: [60, 60, 120, 90],
            });
            const scatterplotLayers = hurricanePathsData.flatMap(hurricane => {
                return hurricane.magnitudes.map((magnitude, index) => {
                    // Assuming that there is a one-to-one correspondence between path and magnitudes
                    const coordinates = hurricane.path[index];
                    return new ScatterplotLayer({
                        id: `magnitude-${hurricane.id}-${index}`,
                        data: [{ coordinates, magnitude: magnitude.value }],
                        getPosition: d => d.coordinates,
                        getRadius: d => d.magnitude * 250, // Adjust scaleFactor based on your data scale
                        getFillColor: d => colorScaleMagnitude(d.magnitude), // Example color, adjust as needed
                        pickable: true,
                        onClick: ({object}) => alert(`Magnitude: ${object.magnitude} @ ${object.coordinates}`), // Example interaction
                    });
                });
            });
            const iconLayers = hurricanePathsData.map(hurricane => {
                const lastLocation = hurricane.path[hurricane.path.length - 1];
                return new IconLayer({
                    id: `icon-${hurricane.id}`,
                    data: [{ coordinates: lastLocation }],
                    getPosition: d => d.coordinates,
                    iconAtlas: svgToDataURL(svgString),
                    iconMapping: {
                        icon: { x: 0, y: 0, width: 200, height: 200, mask: true },
                    },
                    getIcon: d => 'icon',
                    getSize: 80, 
                    sizeScale: 1, 
                });
            });
            return [geoJsonLayer, ...iconLayers, ...scatterplotLayers];
        })
        .catch(error => {
            alert(error.message);
            // Return null or some indication of failure that you can handle later
            return null;
        });
}

export const callAddonLayer = (dateObj, type) => {
    const year = dateObj.getFullYear();
    const month = `${dateObj.getMonth() + 1}`.padStart(2, '0'); 
    const day = `${dateObj.getDate()}`.padStart(2, '0');
    const formattedDate = `${year}/${month}/${day}`;
    
    // Return the axios promise
    return axios.get(`http://127.0.0.1:8000/hurricane-map/layer/${type}/${formattedDate}/`)
    .then(response => {
        const geoJsonData = response.data.assets;
        // Process and return the newGeoJsonLayer
        const newGeoJsonLayer = new GeoJsonLayer({
            id: 'geojson-layer',
            data: geoJsonData,
            pickable: true,
            stroked: false,
            filled: true,
            extruded: false,
            lineWidthMinPixels: 1,
            getFillColor: d => colorScale(d.properties.value),
            getLineColor: [255, 255, 255],
            getLineWidth: 1,
        });
        return newGeoJsonLayer;
    })
    .catch(error => {
        alert(error.message);
        // Return null or some indication of failure that you can handle later
        return null;
    });
}