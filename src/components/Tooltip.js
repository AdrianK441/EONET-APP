const Tooltip = ({ isVisible, content, position }) => {
    if (!isVisible) return null;

    const styles = {
        tooltipContainer: {
            position: 'absolute',
            top: position.y,
            left: position.x,
            backgroundColor: "rgba(80, 80, 80, 1)",
            color: 'white',
            padding: '5px',
            borderRadius: '5px',
            zIndex: 1000, 
            whiteSpace: 'nowrap', 
        }
    };

    return (
        <div style={styles.tooltipContainer}>
            {content}
        </div>
    );
};

export default Tooltip;
