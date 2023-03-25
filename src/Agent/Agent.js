import React, { useEffect, useState } from 'react'
import Board from '../Board/Board';

export default function Agent({state, updateState, handleRefreshClick}) {

    const [arrowCount, setArrowCount] =  useState(1);
    const [direction, setDirection] =  useState('E');
    const [locationX, setLocationX] =  useState(0);
    const [locationY, setLocationY] =  useState(0);
    const [score, setScore] =  useState(0);
    const [agentDead, setAgentDead] =  useState(false);
    const [hasGold, setHasGold] =  useState(false);
    const [wumpusDead, setWumpusDead] =  useState(false);
    const [moveCounter, setMoveCounter] = useState(0);
    document.onkeydown = handleKeyDown;

    useEffect(() => {
        updateDirectionOfAgent();
        updateLocationOfAgent();
        updateScore();
    }, [direction, locationX, locationY, hasGold])

    useEffect(() => {
        if (wumpusDead) {
            clearStench();
        }
    }, [wumpusDead])

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

    function clearStench(newState) {
        updateState((oldState) => {
            const newState = [...oldState];
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (newState[i][j].includes("Stench")) {
                        newState[i][j] = newState[i][j].replace("Stench", "")
                    }
                }
            }
            return newState;
        })

    }

    function onSpaceBarPressed() {
        if (arrowCount === 1) {
            updateState((oldState) => {
                const newState = [...oldState];
                if (direction === 'E') {
                    for (let y = locationY; y < 4; y++) {
                        if (newState[locationX][y].includes('W')) {
                            setWumpusDead(true);
                            newState[locationX][y] = newState[locationX][y].replace("W", "")
                        }
                    }
                }
                if (direction === 'W') {
                    for (let y = locationY; y >= 0; y--) {
                        if (newState[locationX][y].includes('W')) {
                            setWumpusDead(true);
                            newState[locationX][y] = newState[locationX][y].replace("W", "")
                        }
                    }
                }
                if (direction === 'N') {
                    for (let x = locationX; x >= 0; x--) {
                        if (newState[x][locationY].includes('W')) {
                            setWumpusDead(true);
                            newState[x][locationY] = newState[x][locationY].replace("W", "")
                        }
                    }
                }
                if (direction === 'S') {
                    for (let x = locationX; x < 4; x++) {
                        if (newState[x][locationY].includes('W')) {
                            setWumpusDead(true);
                            newState[x][locationY] = newState[x][locationY].replace("W", "")
                        }
                    }
                }
                return newState;
            })
            setArrowCount(0);
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
        } else if (event.keyCode == '32') {
            console.log('SpaceBar Pressed')
            onSpaceBarPressed();
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
            <Board grid={state} locationX={locationX} locationY={locationY} arrowCount={arrowCount}></Board>
            <div class='info'>
                <h1>Current Score: {score - moveCounter}</h1>
                <h1>Arrows Remaining: {arrowCount}</h1>
                <button onClick={handleRefreshClick}>PLAY AGAIN!</button>
            </div>
        </>
    )
}