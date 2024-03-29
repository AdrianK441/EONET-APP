import React, { useEffect, useState, useRef } from 'react';
import DeckGL from 'deck.gl';
import { PathLayer, GeoJsonLayer } from '@deck.gl/layers';
import Map from "react-map-gl";
import axios from 'axios';
import * as maptilersdk from '@maptiler/sdk';
import { scaleLinear } from 'd3-scale';
import {callHurricaneLayer, callAddonLayer} from '../utils/axios.js'


const styles = {
    mapContainer: {
        position: "fixed",
        height: "100vh",
        width: "100vw",
    },
    select: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: { // Add button styles here
        position: 'absolute', // Position your button on the map
        top: 20, // Adjust top as needed
        right: 20, // Adjust right as needed
        padding: '10px 20px',
        zIndex: 100, // Ensure button is above map layers
        cursor: 'pointer',
    }
};

const INITIAL_VIEW_STATE = {
    latitude: 0,
    longitude: 0,
    zoom: 3,
    bearing: 0,
    pitch: 0
};

const layerFunctions = {
    hurricane: callHurricaneLayer,
    sea: callAddonLayer, 
    rain: callAddonLayer,
};

async function fetchActiveLayers(layerIDs, date) {
    const promises = layerIDs.map(layerID => {
        const fetchFunction = layerFunctions[layerID];
        if (fetchFunction) {
            // Await the asynchronous function call
            return fetchFunction(date, layerID);
        } else {
            console.warn(`No fetch function defined for layer: ${layerID}`);
            return Promise.resolve(null); // Ensure we always return a promise
        }
    });

    // Use Promise.all to wait for all promises to resolve
    const layersData = await Promise.all(promises);
    return layersData.filter(layerData => layerData !== null);
}
  

function MapDisplay(props) {
    const [viewport, setViewport] = useState(INITIAL_VIEW_STATE);
    const [layers, setLayers] = useState([]);
    
    const prevLayerIDsRef = useRef(props.layerIDs);
    const prevDateRef = useRef(props.currentDate);
      
   
    useEffect(() => {
        const fetchLayers = async () => {
            fetchActiveLayers(props.layerIDs, props.currentDate).then((result) => {
                setLayers(result)
            });
        };
    
        // Check if layerIDs or currentDate has changed
        if (JSON.stringify(props.layerIDs) !== JSON.stringify(prevLayerIDsRef.current) || props.currentDate !== prevDateRef.current) {
            fetchLayers();
        }
    
        // Update the refs with the current values for the next comparison
        prevLayerIDsRef.current = props.layerIDs;
        prevDateRef.current = props.currentDate;
    }, [props.layerIDs, props.currentDate]); // Dependency array

    return (
        <div style={styles.mapContainer}>
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={layers}
            >
                <Map
                    {...viewport}
                    width="100%"
                    height="100%"
                    mapStyle={props.MAP_STYLE}
                    mapboxAccessToken={props.MAPBOX_ACCESS_TOKEN}
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                />
            </DeckGL>
        </div>
    );
}

export default MapDisplay;