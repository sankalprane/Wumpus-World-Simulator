import React, {useState, useEffect} from 'react'
import './Board.css'
const visitedLocations = new Set();

export default function Board({grid, locationX, locationY}) {

    const [visited, setVisited] = useState([[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]]);

    useEffect(()=> {
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

    return (
        <div className="puzzle-container">
            {grid.map((row, i) => (
                <div key={i} className="puzzle-row">
                    {row.map((col, j) => {
                            
                            // return (
                            // <span key={j} className="puzzle-square">
                            //     <img className="cell" src={require('../Static/Images/Agent-East.png')} alt="Test" />
                            // </span>);

                        
                        if (visited[i][j]) {
                            if (col.includes('>')) {
                                return (
                                    <span key={j} className="puzzle-square">
                                        {col.replace(">", "")}
                                        <img className="cell" src={require('../Static/Images/Agent-East.png')} alt="Test" />
                                    </span>);
                            }
                            if (col.includes('V')) {
                                return (
                                    <span key={j} className="puzzle-square">
                                        {col.replace("V", "")}
                                        <img className="cell" src={require('../Static/Images/Agent-South.png')} alt="Test" />
                                    </span>);
                            }
                            if (col.includes('A')) {
                                return (
                                    <span key={j} className="puzzle-square">
                                        {col.replace("A", "")}
                                        <img className="cell" src={require('../Static/Images/Agent-North.png')} alt="Test" />
                                    </span>);
                            }
                            if (col.includes('<')) {
                                return (
                                    <span key={j} className="puzzle-square">
                                        {col.replace("<", "")}
                                        <img className="cell" src={require('../Static/Images/Agent-West.png')} alt="Test" />
                                    </span>);
                            }
                            return (<span key={j} className="puzzle-square">{col}</span>);
                        } else {
                            return (<span key={j} className="puzzle-square"></span>);
                        }
                    })}
                </div>
            ))}
        </div>
    )
}