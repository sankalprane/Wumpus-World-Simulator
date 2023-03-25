import React, { useState, useEffect, cloneElement } from 'react'
import './Board.css'
const visitedLocations = new Set();

export default function Board({ grid, locationX, locationY }) {

    const [visited, setVisited] = useState([[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]]);

    useEffect(() => {
        console.log('inside useEffect of Board')
        updateVisitedLocations();
    }, [locationX, locationY])

    function updateVisitedLocations() {
        setVisited((oldVisited) => {
            const newVisited = [...oldVisited];
            visited[locationX][locationY] = true;
            return newVisited;
        });
    }

    function displayUI(col, i, j) {
        const cell = []
        if (visited[i][j]) {
            if (col.includes('W')) {
                col = col.replace("W", "")
                cell.push (
                    <>
                        <img className="wumpus" src={require('../Static/Images/Wumpus.png')} alt="Test" />
                    </>);
            }
            if (col.includes('G')) {
                col = col.replace("G", "")
                cell.push (
                    <>
                        <img className="cell" src={require('../Static/Images/Gold.png')} alt="Test" />
                    </>);
            }
            if (col.includes('>')) {
                col = col.replace(">", "")
                cell.push (
                    <>
                        <img className="cell" src={require('../Static/Images/Agent-East.png')} alt="Test" />
                    </>);
            }
            if (col.includes('V')) {
                col = col.replace("V", "")
                cell.push (
                    <>
                        <img className="cell" src={require('../Static/Images/Agent-South.png')} alt="Test" />
                    </>);
            }
            if (col.includes('A')) {
                col = col.replace("A", "")
                cell.push (
                    <>
                        <img className="cell" src={require('../Static/Images/Agent-North.png')} alt="Test" />
                    </>);
            }
            if (col.includes('<')) {
                col = col.replace("<", "")
                cell.push (
                    <>
                        <img className="cell" src={require('../Static/Images/Agent-West.png')} alt="Test" />
                    </>);
            }
        } else {
            return (<span key={j} className="puzzle-square"></span>);
        }
        return (<span key={j} className="puzzle-square">{col}{cell}</span>)
    }

    return (
        <div className="puzzle-container">
            {grid.map((row, i) => (
                <div key={i} className="puzzle-row">
                    {row.map((col, j) => {
                        return (displayUI(col, i, j))
                    })}
                </div>
            ))}
        </div>
    )
}