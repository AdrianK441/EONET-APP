import React, { useEffect, useState, useRef } from 'react';
import Timeline from './Timeline';

const styles = {
    navbar: {
        position: "fixed",
        left: "0",
        right: "0",
        top: "0",
        height: "60px",
        backgroundColor: "transparent",
        padding: "0 1rem",
        zIndex: "1000"
    },
    ul: {
        maxWidth: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-end",
        listStyle: "none",
        margin: "0",
        padding: "0",
    }
};

function Navbar(props){
    return (
        <nav style={styles.navbar}>
            <ul style={styles.ul}>
                {props.children}
            </ul>
        </nav>
    )
}

export default Navbar