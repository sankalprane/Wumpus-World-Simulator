import React from 'react'
import './Board.css'

export default function Board({grid}) {

    return (
        <div className="puzzle-container">
            {grid.map((row, i) => (
                <div key={i} className="puzzle-row">
                    {row.map((col, j) => {
                          return (<span key={j} className="puzzle-square">{col}</span>);
                    })}
                </div>
            ))}
        </div>
    )
}