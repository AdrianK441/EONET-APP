import React, { useState } from 'react';
import { ReactComponent as RainIcon } from '../icons/rain.svg'
import { ReactComponent as HurricaneIcon } from '../icons/hurricane1.svg'
import { ReactComponent as SSTIcon } from '../icons/SST.svg'
import { ReactComponent as ChevronRIcon } from '../icons/chevronR.svg'

import DropdownItem from './DropdownItem';



const styles = {
    menuItem: {
      height: "30px",
      display: "flex",
      alignItems: "center",
      borderRadius: "50px",
      transition: "background 100",
      padding: "0.5rem",
      textDecoration: "none",
      color: "white",
    },
    menuItemHover: {
      backgroundColor: "#525357",
    },
    RightIcon: {
      marginLeft: "auto"
    },
    iconButton: {
      backgroundColor: "#6a6e73",
      width: "40px",
      height: "40px",
      borderRadius: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0px 10px 0px 0px"
    },
    ActiveIconButton: {
      backgroundColor: "#91bf63",
    },
    ReturnIcon: {
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

function Dropdown(props) {
  const [activeMenu, setActiveMenu] = useState('main');
  
  function DropdownReturnItem(props) {
    return(
      <a href= "#" style={styles.menuItem} onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span style={styles.ReturnIcon}>{props.rightIcon}</span>
        {props.children}
      </a>
    )
  }


  return (
    <div className="dropdown">
        <div className='menu'>
          <DropdownItem 
          goToMenu="hurricane" 
          leftIcon={<HurricaneIcon width="25px" height="25px"/>}
          rightIcon={<ChevronRIcon width="30px" height="30px"/>}
          layerId="hurricane"
          toggleActiveLayer={props.toggleActiveLayer}
          activeLayers={props.activeLayers}
          setActiveMenu={setActiveMenu}
          >
            Hurricanes
          </DropdownItem>
          
          <DropdownItem 
          goToMenu="sea" 
          leftIcon={<SSTIcon width="25px" height="25px"/>}
          rightIcon={<ChevronRIcon width="30px" height="30px"/>}
          layerId="sea"
          toggleActiveLayer={props.toggleActiveLayer}
          activeLayers={props.activeLayers}
          setActiveMenu={setActiveMenu}
          >
          Sea Surface Temperature
          </DropdownItem>
          <DropdownItem 
          goToMenu="rain" 
          leftIcon={<RainIcon width="25px" height="25px"/>}
          rightIcon={<ChevronRIcon width="30px" height="30px"/>}
          layerId="rain"
          toggleActiveLayer={props.toggleActiveLayer}
          activeLayers={props.activeLayers}
          setActiveMenu={setActiveMenu}
          >
          Rainfall
          </DropdownItem>
        </div>
    </div>
  );
}

export default Dropdown;