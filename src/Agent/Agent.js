import React, { useEffect, useState } from 'react'
import Board from '../Board/Board';

export default function Agent({state, updateState}) {

    const [direction, setDirection] =  useState('E');
    const [locationX, setLocationX] =  useState(0);
    const [locationY, setLocationY] =  useState(0);
    const [score, setScore] =  useState(0);
    const [agentDead, setAgentDead] =  useState(false);
    const [hasGold, setHasGold] =  useState(false);
    const [moveCounter, setMoveCounter] = useState(0);
    document.onkeydown = handleKeyDown;

    useEffect(() => {
        updateDirectionOfAgent();
        updateLocationOfAgent();
        updateScore();
    }, [direction, locationX, locationY, hasGold])

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

    function onEnterKeyPressed() {
        if (state[locationX][locationY].includes('G')) {
            updateState((oldState) => {
                const newState = [...oldState];
                newState[locationX][locationY] = newState[locationX][locationY].replace("G", " ");
                return newState;
            })
            setHasGold(true);
        }
    }

    function handleKeyDown(event) {
        if (agentDead)
            return;
        setMoveCounter(oldValue => oldValue + 1)
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
        } else if (event.keyCode == '13') {
            console.log('Enter Key Pressed')
            onEnterKeyPressed();
        }
    }

    function updateScore() {
        console.log(locationX, locationY);
        if (state[locationX][locationY].includes("W") || state[locationX][locationY].includes("P")) {
            setScore((oldScore) => {
                oldScore -= 1000;
                setAgentDead(true);
                return oldScore;
            })
        }
        if (hasGold) {
            setScore((oldScore) => {
                oldScore += 1001;
                setAgentDead(true);
                return oldScore;
            })
        }
    }

    return (
        <>
            <h1>Score: {score - moveCounter}</h1>
            <Board grid={state} locationX={locationX} locationY={locationY}></Board>
        </>
    )
}