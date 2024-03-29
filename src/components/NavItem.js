import React, { useEffect, useState, useRef } from 'react';

const styles = {
    item: {
        width: "calc(var(80px) * 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: "30px",
        height: "30px",
        backgroundColor: "#484a4d",
        borderRadius: "50%",
        padding: "5px",
        margin: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        transition: "filter 300ms",
    },
    buttonHovered: {
        filter: "brightness(1.2)"
    }
};

function NavItem(props){
    const [isHovered, setIsHovered] = useState(false);
    const [open, setOpen] = useState(false);

    const toggleHover = () => setIsHovered(!isHovered);
    
    return (
        <li style={styles.item} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            <a href="#" 
            style={isHovered ? {...styles.button, ...styles.buttonHovered} : styles.button} 
            onClick={() => setOpen(!open)}
            >
                {props.icon}
            </a>
            {open && props.children}
        </li>
    )
}

export default NavItem