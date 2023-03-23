import React, { useEffect, useState } from "react";
import Board from "../Board/Board";

const dir_row = [1, -1, 0, 0];
const dir_col = [0, 0, 1, -1];

export default function Environment() {

    const [state, setState] = useState([[null, null, null, null], [null, null, null, null], [null, null, null, null],  [null, null, null, null]]);

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
                state[newX][newY] = 'Stench'
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
            newState[i][j] = "W";
            generateStench(i, j, newState);
            return newState;
        })
    }

    function generateBreeze(x, y, state) {
        for (let i = 0; i < 4; i++) {
            let newX = x + dir_row[i];
            let newY = y + dir_col[i];
            if (isValid(newX, newY))
                if (state[newX][newY] == 'Stench') {
                    state[newX][newY] = 'Stench \nBreeze'
                } else if (state[newX][newY] == 'W') {
                    state[newX][newY] = 'W \nBreeze'
                } else {
                    state[newX][newY] = 'Breeze'
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
            if (newState[i][j] == "W") {
                newState[i][j] = "W P"
            } else {
                newState[i][j] = "P";
            }
            generateBreeze(i, j, newState);
            return newState;
        })
    }

    return (
        <>
            <Board grid={state}></Board>
            <button onClick={generateWumpus} colorScheme='teal'>Play Again!</button>
        </>
    )
}