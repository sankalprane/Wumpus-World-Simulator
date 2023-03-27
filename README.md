# Wumpus World Simulator

This project was build to practise building different AI agents to score the maximum possible points

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

[Click here to see the hosted app](https://wumpus-world-simulator.herokuapp.com)
<img width="1226" alt="image" src="https://user-images.githubusercontent.com/73281026/228037500-691d1c6d-6a48-4b51-b03a-2c17521e1875.png">


Rules:
1. Stench can be perceived in the squares adjacent to the wumpus.
2. Breeze can be perceived in the squares adjacent to the pits. There will be two pits in the simulation.
3. The Agent can shoot in the direction he is facing with spacebar. The agent has only one arrow in the game. Shooting the wumpus will kill it and the stench will disappear.
4. The penalty is -1000 if the agent dies, -1 per move and +1000 if agent grabs the gold.
5. The goal of the agent is to maximize the score by grabbing the gold. (Note that the gold can be co-located with the wumpus or pits. So it will not always be possible to get the gold)
