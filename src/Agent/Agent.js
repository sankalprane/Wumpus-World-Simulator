import React, { useEffect, useState } from 'react'
import Board from '../Board/Board';

export default function Agent({state, updateState}) {

    // let direction = 'E';
    let locationX = 0, locationY = 0;


    useEffect(() => {
        console.log('inside useEffect of Agent');
        initializeAgent();
      }, []);

    function initializeAgent() {
        updateState((oldState) => {
            const newState  = [...oldState];
            newState[locationX][locationY] += '\n>';
            return newState;
        });
    }


    return (
        <>
            <Board grid={state}></Board>
        </>
    )
}