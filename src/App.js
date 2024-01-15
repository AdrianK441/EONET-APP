import React, {useState} from 'react';
import Map from "react-map-gl"
import DeckGL, {GeoJsonLayer} from 'deck.gl'
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYWRyaWFuazQ0MSIsImEiOiJjbHJleXlsZXMxcWh0MmlueDFoMGY2dm85In0._nP2y2DY0PUQY0Arkhc1jQ';
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

const INITIAL_VIEW_STATE ={
  latitude: 0,
  longitude: 0,
  zoom: 3,
  bearing: 0,
  pitch: 30
}

function App() {
  const [viewport, setVieport] = useState(INITIAL_VIEW_STATE)
  
  return (
    <DeckGL
      initialViewState = {viewport}
      controller={true} >
      <Map mapStyle={MAP_STYLE} mapboxAccessToken= {MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
}

export default App;
