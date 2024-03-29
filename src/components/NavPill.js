import React, { useEffect, useState, useRef } from 'react';
import { ReactComponent as RainIcon } from '../icons/rain.svg'
import { ReactComponent as HurricaneIcon } from '../icons/hurricane1.svg'
import { ReactComponent as SSTIcon } from '../icons/SST.svg'

const styles = {
    item: {
        width: "calc(var(60px) * 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: "240px",
        height: "30px",
        backgroundColor: "#6a6e73",
        borderRadius: "500px",
        padding: "5px 5px 5px 0px",
        margin: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textDecoration: "none",
        transition: "filter 300ms",
    },
    sideButton: {
        backgroundColor: "#484a4d",
        width: "40px",
        height: "40px",
        borderRadius: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    icons: {
        backgroundColor: "#91bf63",
        width: "35px",
        height: "35px",
        borderRadius: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0px 0px 0px 8px"
    }
};

const icons = {
    hurricane: <HurricaneIcon width="25" height="25"/>,
    sea: <SSTIcon width="25" height="25"/>,
    rain: <RainIcon width="25" height="25"/>,
};


function NavPill(props){
    const [isHovered, setIsHovered] = useState(false);
    const [open, setOpen] = useState(false);

    const toggleHover = () => setIsHovered(!isHovered);
    
    return (
        <li style={styles.item} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            <a href="#" 
            style={styles.button} 
            onClick={() => setOpen(!open)}
            >
            <div style={styles.sideButton}>
                {props.icon}
            </div>
            {props.activeLayers.map((layer) => (
                    <div key={layer} style={styles.icons}>
                        {icons[layer]}
                    </div>
                ))}
            </a>
            {open && props.children}
        </li>
    )
}

export default NavPill