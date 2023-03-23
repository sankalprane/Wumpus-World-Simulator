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
                        if (visited[i][j]) {
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