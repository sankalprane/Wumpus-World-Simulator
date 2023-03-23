import React, { useEffect, useState } from "react";
import Agent from "../Agent/Agent";

const dir_row = [1, -1, 0, 0];
const dir_col = [0, 0, 1, -1];

export default function Environment() {

    const [state, setState] = useState([[' ', ' ', ' ', ' '], [' ', ' ', ' ', ' '], [' ', ' ', ' ', ' '],  [' ', ' ', ' ', ' ']]);

    useEffect(() => {
        console.log('inside useEffect');
        generateWumpus();
        generatePit();
        generatePit();
      }, []);

    function isValid(i, j) {
        if (i >=0 && i < 4 && j >= 0 && j < 4)
            return true;
        return false;
    }

    function generateStench(x, y, state) {
        for (let i = 0; i < 4; i++) {
            let newX = x + dir_row[i];
            let newY = y + dir_col[i];
            if (isValid(newX, newY))
                state[newX][newY] += 'Stench'
        }
    }

    function generateWumpus() {
        const iMin = 0, iMax = 3, jMin = 0, jMax = 3;
        let i = 0, j = 0;
        while (i === 0 && j === 0) {
            i = Math.floor(Math.random() * (iMax - iMin + 1)) + iMin;
            j = Math.floor(Math.random() * (jMax - jMin + 1)) + jMin;
        }
        setState((oldState) => {
            const newState = [...oldState];
            newState[i][j] += "W";
            generateStench(i, j, newState);
            return newState;
        })
    }

    function generateBreeze(x, y, state) {
        for (let i = 0; i < 4; i++) {
            let newX = x + dir_row[i];
            let newY = y + dir_col[i];
            if (isValid(newX, newY))
                if(!state[newX][newY].includes('Breeze')) {
                    state[newX][newY] += '\nBreeze';
                }
               
        }
    }

    function generatePit() {
        const iMin = 0, iMax = 3, jMin = 0, jMax = 3;
        let i = 0, j = 0;
        while (i === 0 && j === 0) {
            i = Math.floor(Math.random() * (iMax - iMin + 1)) + iMin;
            j = Math.floor(Math.random() * (jMax - jMin + 1)) + jMin;
        }
        setState((oldState) => {
            const newState = [...oldState];
            newState[i][j] += "\nP";
            generateBreeze(i, j, newState);
            return newState;
        })
    }

    return (
        <>
            <Agent state={state} updateState={setState}></Agent>
            <button onClick={generateWumpus} colorScheme='teal'>Play Again!</button>
        </>
    )
}