import React, {useEffect, useState} from 'react';
import MapDisplay from './components/MapDisplay';
import Navbar from './components/Navbar';
import NavItem from './components/NavItem';
import NavPill from './components/NavPill';
import Dropdown from './components/Dropdown';
import { CSSTransition } from 'react-transition-group'
import { ReactComponent as BurgerIcon } from './icons/burger.svg'
import { ReactComponent as ClipboardIcon } from './icons/clipboard.svg'
import { ReactComponent as PinIcon } from './icons/pin.svg'
import { callHurricaneLayer } from './utils/axios.js'
import Timeline from './components/Timeline';



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
  const [activeLayersIDs, setActiveLayerIDs] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date())
  
  function toggleActiveLayer(layer) {
    if (activeLayersIDs.includes(layer)) {
      setActiveLayerIDs(activeLayersIDs.filter((l) => l !== layer));
    } else {
      setActiveLayerIDs([...activeLayersIDs, layer]);
    }
  }
  
  return (
    <>
      <Navbar currentDate={currentDate} setCurrentDate={setCurrentDate}>
        <NavPill icon={<BurgerIcon className="svg" width="30px" height="30px"/>} activeLayers={activeLayersIDs}>
          <Dropdown activeLayers={activeLayersIDs} toggleActiveLayer={toggleActiveLayer}/>
        </NavPill>
        <NavItem icon={<PinIcon className="svg" width="30px" height="30px"/>}/>
        <NavItem icon={<ClipboardIcon className="svg" width="30px" height="30px"/>}/>
      </Navbar>
      <MapDisplay MAP_STYLE={MAP_STYLE} MAPBOX_ACCESS_TOKEN={MAPBOX_ACCESS_TOKEN} layerIDs={activeLayersIDs} currentDate={currentDate}/>
      <Timeline currentDate={currentDate} setCurrentDate={setCurrentDate} />
    </>
  );
}

export default App;
