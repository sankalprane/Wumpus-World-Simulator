import React, { useEffect, useState } from 'react'
import Board from '../Board/Board';

export default function Agent({state, updateState}) {

    const [direction, setDirection] =  useState('E');
    const [locationX, setLocationX] =  useState(0);
    const [locationY, setLocationY] =  useState(0);
    document.onkeydown = handleKeyDown;

    function isValid(i, j) {
        if (i >=0 && i < 4 && j >= 0 && j < 4)
            return true;
        return false;
    }

    function updateDirectionOfAgent() {
        updateState((oldState) => {
            const newState = [...oldState];
            if (direction === 'N') {
                newState[locationX][locationY] = newState[locationX][locationY].replace(">", "A").replace("<", "A").replace("V", "A");

            }
            if (direction === 'E') {
                newState[locationX][locationY] = newState[locationX][locationY].replace("A", ">").replace("<", ">").replace("V", ">");

            }
            if (direction === 'S') {
                newState[locationX][locationY] = newState[locationX][locationY].replace(">", "V").replace("<", "V").replace("A", "V");

            }
            if (direction === 'W') {
                newState[locationX][locationY] = newState[locationX][locationY].replace(">", "<").replace("A", "<").replace("V", "<");
            }
            return newState;
        })
    }

    function updateLocationOfAgent() {
        updateState((oldState) => {
            const newState = [...oldState];
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    newState[i][j] = newState[i][j].replace(">", " ").replace("A", " ").replace("V", " ").replace("<", " ");
                }
            }
            if (direction === 'N') {
                newState[locationX][locationY] += ' A'
            } else if (direction === 'W') {
                newState[locationX][locationY] += ' <'
            } else if (direction === 'E') {
                newState[locationX][locationY] += ' >'
            } else {
                newState[locationX][locationY] += ' V'
            }
            return newState;
        })
    }

    useEffect(() => {
        updateDirectionOfAgent();
        updateLocationOfAgent();
    }, [direction, locationX, locationY])

    function onArrowUpPressed() {
        if (direction === 'N') {
            if (isValid(locationX - 1, locationY)) {
                setLocationX((oldValue) => {
                    oldValue--;
                    return oldValue;
                })
            }
        } else {
            setDirection('N');
        }
    }

    function onArrowDownPressed() {
        if (direction === 'S') {
            if (isValid(locationX + 1, locationY)) {
                setLocationX((oldValue) => {
                    oldValue++;
                    return oldValue;
                })
            }
        } else {
            setDirection('S');
        }
    }

    function onArrowRightPressed() {
        if (direction === 'E') {
            if (isValid(locationX, locationY + 1)) {
                setLocationY((oldValue) => {
                    oldValue++;
                    return oldValue;
                })
            }
        } else {
            setDirection('E');
        }
    }

    function onArrowLeftPressed() {
        if (direction === 'W') {
            if (isValid(locationX, locationY - 1)) {
                setLocationY((oldValue) => {
                    oldValue--;
                    return oldValue;
                })
            }
        } else {
            setDirection('W');
        }
    }

    function handleKeyDown(event) {
        if (event.keyCode == '38') {
            console.log('Arrow Up Key Pressed')
            onArrowUpPressed();
        }
        else if (event.keyCode == '40') {
            console.log('Arrow Down Key Pressed')
            onArrowDownPressed();
        }
        else if (event.keyCode == '37') {
            console.log('Arrow Left Key Pressed')
            onArrowLeftPressed();
        }
        else if (event.keyCode == '39') {
            console.log('Arrow Right Key Pressed')
            onArrowRightPressed();
        }
    }

    return (
        <>
            <Board grid={state}></Board>
        </>
    )
}