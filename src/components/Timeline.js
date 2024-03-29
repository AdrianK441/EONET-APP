import React, { useState } from 'react';
import { format, eachDayOfInterval, startOfYear, endOfYear, isSameDay, getDayOfYear, addYears, isAfter, addDays } from 'date-fns';
import Tooltip from './Tooltip';
import NavButton from './NavButton';
import { ReactComponent as DayLeft } from '../icons/dayLeft.svg'
import { ReactComponent as DayRight } from '../icons/dayRight.svg'
import { ReactComponent as YearLeft } from '../icons/yearLeft.svg'
import { ReactComponent as YearRight } from '../icons/yearRight.svg'


const styles = {
    bottomBar: {
        display: "flex",
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "transparent",

    },
    timelineContainer: {
        display: "flex",
        flexdirection: "row",
        width: "100vw",
        padding: "0px",
        backgroundColor: "transparent", 
        justifyContent: "center",
    },
    controlsContainer: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
    },
    daysContainer: {
        display: "flex",
        alignItems: "flex-end",
        padding: "10px",
        width: "90vw",
        backgroundColor: "transparent",
    },
    day: {
        height: "12px",
        flexGrow: 0, 
        flexShrink: 0, 
        flexBasis: `0.27%`, 
        backgroundColor: "#6a6e73",
        cursor: "pointer",
    },
    dayHovered: {
        height: "20px", 
        backgroundColor: "#f01",
    },
    daySelected: {
        backgroundColor: "#f00",
        height: "15px", 
    },
    dayFuture: {
        backgroundColor: "rgba(200, 200, 200, 0.7)",
        cursor: "not-allowed",
    },
    button: {
        cursor: "pointer",
        marginLeft: "10px",
        marginRight: "10px",
    },
    monthStartMarker: { 
        height: "20px",
        backgroundColor: "rgba(10, 10, 10, 0.9)", 
        cursor: "default",
        flexGrow: 0, 
        flexShrink: 0, 
        flexBasis: `0.05%`, 
        pointerEvents: "none",
    },
};

const Timeline = (props) => {
    const [hoveredDayIndex, setHoveredDayIndex] = useState(null);
    const [tooltip, setTooltip] = useState({
        isVisible: false,
        content: '',
        position: { x: 0, y: 0 },
    });
    const currentYear = new Date().getFullYear();
    const minYear = 2005;
    const maxYear = currentYear;

    const daysInYear = eachDayOfInterval({
        start: startOfYear(props.currentDate),
        end: endOfYear(props.currentDate),
    });
    
    const isStartOfMonth = (date) => {
        return daysInYear.some(day => day.getTime() === date.getTime()) && date.getDate() === 1;
    };

    const handlePrevYear = () => {
        const newYear = props.currentDate.getFullYear() - 1;
        if (newYear >= minYear) {
            props.setCurrentDate(addYears(props.currentDate, -1));
        }
    };

    const handleNextYear = () => {
        const newYear = props.currentDate.getFullYear() + 1;
        if (newYear <= maxYear) {
            props.setCurrentDate(addYears(props.currentDate, 1));
        }
    };
    
    const handlePrevDay = () => {
        const newYear = props.currentDate.getFullYear() - 1;
            props.setCurrentDate(addDays(props.currentDate, -1));
    };

    const handleNextDay = () => {
        const newYear = props.currentDate.getFullYear() + 1;
            props.setCurrentDate(addDays(props.currentDate, 1));
    };
    
    const handleMouseEnter = (event, day, index) => {
        const content = `${format(day, 'yyyy-MM-dd')}`;
        const targetRect = event.currentTarget.getBoundingClientRect(); 
        const position = { 
            x: targetRect.left + (targetRect.width / 2),
            y: window.scrollY + targetRect.top - 47 
        };
        setHoveredDayIndex(index)
        setTooltip({ isVisible: true, content, position });
    };

    const handleMouseLeave = () => {
        setHoveredDayIndex(null)
        setTooltip({ ...tooltip, isVisible: false });
    };

    const isPrevYearDisabled = props.currentDate.getFullYear() <= minYear;
    const isNextYearDisabled = props.currentDate.getFullYear() >= maxYear;

    return (
        <>
            <div style={styles.bottomBar}>
                <div>
                    <span>{format(props.currentDate, 'yyyy-MM-dd')}</span>
                </div>
                <div style={styles.timelineContainer}>
                    <NavButton onClick={handlePrevYear} icon={<YearLeft className="svg" width="30px" height="30px"/>} ></NavButton>
                    <NavButton onClick={handlePrevDay} icon={<DayLeft className="svg" width="30px" height="30px"/>} ></NavButton>
                    <div style={styles.daysContainer}>
                        {daysInYear.map((day, index) => (
                        <>
                            {isStartOfMonth(day) && (
                                <div style={styles.monthStartMarker} />
                            )}
                            <div
                                key={index}
                                onMouseEnter={isAfter(day, new Date()) ? undefined : (e) => handleMouseEnter(e, day, index)}
                                onMouseLeave={isAfter(day, new Date()) ? undefined : handleMouseLeave}
                                onClick={isAfter(day, new Date()) ? undefined : () => {
                                    props.setCurrentDate(day)
                                }}
                                style={
                                    isSameDay(day, props.currentDate)
                                        ? { ...styles.day, ...styles.daySelected }
                                        : isAfter(day, new Date())
                                          ? { ...styles.day, ...styles.dayFuture }
                                          : hoveredDayIndex === index
                                            ? { ...styles.day, ...styles.dayHovered }
                                            : styles.day
                                }
                                title={`Day ${getDayOfYear(day)}: ${format(day, 'yyyy-MM-dd')}`}
                            />
                        </>
                        ))}
                    </div>
                    <NavButton onClick={handleNextDay} icon={<DayRight className="svg" width="30px" height="30px"/>} ></NavButton>
                    <NavButton onClick={handleNextYear}icon={<YearRight className="svg" width="30px" height="30px"/>} ></NavButton>
                </div>
            </div>
            <Tooltip isVisible={tooltip.isVisible} content={tooltip.content} position={tooltip.position} />
        </>
    );
};

export default Timeline;
