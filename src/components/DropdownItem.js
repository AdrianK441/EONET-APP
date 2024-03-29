import React, { useState } from 'react';


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

function DropdownItem(props) {
    const [isActive, setIsActive] = useState(props.activeLayers.includes(props.layerId))
        
    return(
      <div style={styles.menuItem}>
        <a href="#" onClick={(e) => {
          setIsActive(!isActive)
          props.toggleActiveLayer(props.layerId);
        }}>
          <span style={isActive ? {...styles.iconButton, ...styles.ActiveIconButton} : styles.iconButton}>{props.leftIcon}</span>
        </a>
        <a  href= "#" style={styles.menuItem} onClick={() => {}}>
          {props.children}
          <span style={styles.RightIcon}>{props.rightIcon}</span>
        </a>
      </div>
    )
  }
  
  
export default DropdownItem