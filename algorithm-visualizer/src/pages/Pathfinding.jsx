import { Box, Stack, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import useStateRef from 'react-usestateref'
import FlagIcon from '@mui/icons-material/Flag';
import ShieldIcon from '@mui/icons-material/Shield';
import GppBadIcon from '@mui/icons-material/GppBad';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import IconButton from '@mui/material/IconButton';

import Tile from '../components/Tile'
import useWindowDimensions from '../components/CustomHooks'
import { ANIMATIONDELAY, MAXBOARDHEIGHT, NETTILESIZE } from '../components/Constants'
import FunctionButton from '../components/FunctionButton'
import sleep from '../components/HelperFunctions';
import StackADT from '../components/StackADT';
import QueueADT from '../components/QueueADT';


const Pathfinding = () => {
  // Calculating size of tile board
  const { height, width } = useWindowDimensions();
  const [spawned, setSpawned] = useState(false);
  const [rowLength, setRowLength] = useState(0);
  const [tileCount, setTileCount] = useState(0);
  useEffect(() => {
    handleReset();
    const rows = Math.floor((0.8 * width)/ NETTILESIZE);
    const cols = Math.floor(MAXBOARDHEIGHT/ NETTILESIZE);
    const tiles = rows * cols;

    setRowLength(rows);
    setTileCount(tiles)
  }, [height, width])
  
  // Setting up the board
  const refs = useRef({});
  const [tiles, setTiles] = useState([]);
  const [mode, setMode] = useState('start');
  const [start, setStart] = useState(-1);
  const [end, setEnd] = useState(-1);
  const [running, setRunning, runningRef] = useStateRef(false);
  
  const handleSpawnTiles = () => {
    setSpawned(true);
    const temp = [];
    for(let i = 0; i < tileCount; i++) {
      temp.push(i);
    }
    setTiles(temp);
  }

  useEffect(() => {
    if (spawned && tiles.length !== tileCount) {
      handleSpawnTiles();
    }
  }, [tileCount, spawned, tiles])
  
  /**
   * Changes the mode of customising the tile board
   * @param {*} event 
   * @param {String} newMode 
   */
  const handleMode = (event, newMode) => {
    setMode(newMode);
  }
  
  /**
   * Resets all visited and queued up tiles only
   */
  const handleSoftReset = () => {
    if (!spawned) return;
    setRunning(false);
    for(let i = 0; i < tileCount; i++) {
      if (refs.current[i] === null) continue;
      refs.current[i].softReset();
    }
  }
  
  /**
   * Resets ALL tiles
   */
  const handleReset = () => {
    if (!spawned) return;
    setStart(-1);
    setEnd(-1);
    setRunning(false);
    for(let i = 0; i < tileCount; i++) {
      if (refs.current[i] === null) continue;
      refs.current[i].reset();
    }
  }

  /**
   * Customises the property of the specified tile
   * @param {Number} index 
   */
  const handleVisit = (index) => {
    if (mode === 'start') {
      if (start !== -1) {
        refs.current[start].reset();
      }
      refs.current[index].setStart();
      setStart(index);
    } else if (mode === 'end') {
      if (end !== -1) {
        refs.current[end].reset();
      }
      refs.current[index].setEnd();
      setEnd(index);
    } else if (mode === 'wall') {
      refs.current[index].markWall();
    } else if (mode === 'destroy') {
      refs.current[index].reset();
    }
  }

  /**
   * Adding drag and select functionality to board customization
   */
  const [dragging, setDragging] = useState(false);
  const beginDragging = () => {
    setDragging(true);
  };
  const stopDragging = () => {
    setDragging(false);
  };
  const handleHovered = (index) => {
    if(!dragging) {
      return;
    }
    if (mode === 'wall') {
      refs.current[index].markWall();
    } else if (mode === 'destroy') {
      refs.current[index].reset();
    }
  }

  /**
   * Cycle through different algorithms
   */
  const [algorithm, setAlgorithm] = useState('Depth-First Search');
  const cycleAlgos = () => {
    if (algorithm === 'Depth-First Search') {
      setAlgorithm('Breadth-First Search');
    } else if (algorithm === 'Breadth-First Search') {
      setAlgorithm('Depth-First Search');
    }
    handleSoftReset();
  }

  /**
   * Keeps track of time spent running the algorithm
   */
  const [timeSpent, setTimeSpent] = useState(0.00);
  const updateTimer = (startTime) => {
    let currentTime = performance.now();
    const duration = (currentTime - startTime) / 1000;
    setTimeSpent(duration.toFixed(2));
  }

  
  /**
   * Given the index of a tile, returns all adjacent tiles in the form of their index number
   * @param {Number} index 
   * @returns {Array[Number]}
   */
  const getAdjacentTiles = (index) => {
    const adjacent = [];
    const topAdjacent = index - rowLength;
    const botAdjacent = index + rowLength;
    const leftAdjacent = index - 1;
    const rightAdjacent = index + 1;
    
    const currentRow = Math.floor(index / rowLength)
    const leftRow = Math.floor((leftAdjacent) / rowLength)
    const rightRow = Math.floor((rightAdjacent) / rowLength)

    if (topAdjacent >= 0 && !refs.current[topAdjacent].isWall()) {
      adjacent.push(topAdjacent);
    }
    
    if (currentRow === leftRow && !refs.current[leftAdjacent].isWall()) {
      adjacent.push(leftAdjacent);
    }
    
    if (botAdjacent < tileCount && !refs.current[botAdjacent].isWall()) {
      adjacent.push(botAdjacent);
    }

    if (currentRow === rightRow && !refs.current[rightAdjacent].isWall()) {
      adjacent.push(rightAdjacent);
    }

    // Array returned [TOP, LEFT, BOTTOM, RIGHT]
    // Order of being read is backwards => RIGHT, BOTTOM, LEFT, TOP
    return adjacent;
  }

  /**
   * Runs the pathfinding algorithm
   * @returns 
   */
  const handleRun = async () => {
    let startTime = performance.now();
    handleSoftReset();
    if (start === -1 || end === -1) {
      return;
    }
    // Setup
    setRunning(true);
    const visited = [];
    let adjacent = [];
    
    const backtrack = [tileCount];
    let previousTile = start;

    // Deciding which algorithm to go with
    let toVisit = new StackADT();
    if (algorithm === 'Breadth-First Search') toVisit = new QueueADT();

    toVisit.add(start);
    let finished = false;
    
    // 1. Iterate through queue and find adjacent of adjacent
    while (toVisit.length() > 0 && runningRef.current) {
      // 2. Get the next tile to check, if the new tile has been visited, skip. Otherwise, visit it
      let currentTile = toVisit.getNext();
      if (!visited.includes(currentTile)) {
        visited.push(currentTile);
        refs.current[currentTile].visit();
        // backtrack[currentTile] = previousTile;
      } else {
        continue;
      }
      
      // 3. If the new tile is the end point, stop the loop
      previousTile = currentTile;
      if (currentTile === end) {
        finished = true;
        break;
      }

      // 4. Get the adjacent tiles of the new tile
      adjacent = getAdjacentTiles(currentTile);
      for (const tile in adjacent) {
        // 5. Iterate through the adjacent tiles, if we have visited them, skip
        const adjacentTile = adjacent[tile];
        if (!visited.includes(adjacentTile)) {
          await sleep(ANIMATIONDELAY);
          toVisit.add(adjacentTile);
          refs.current[adjacentTile].addToQueue();
          backtrack[adjacentTile] = currentTile;
        };
      }
      await sleep(ANIMATIONDELAY);
      // 6. Repeat.
    }
    // 7. Backtrack.
    while (previousTile !== start && finished) {
      refs.current[previousTile].backtrack();
      previousTile = backtrack[previousTile];
      await sleep(ANIMATIONDELAY);
    }
    setRunning(false);
    updateTimer(startTime);
  }

  /**
   * Stops the pathfinding algorithm
   * DOES NOT reset the board!
   */
  const handleAbort = () => {
    setRunning(false);
  }

  return (
    <Stack className='flex items-center justify-center'>
      <Box className='flex items-center'>
        <p className='font-title text-6xl my-2'>
          {algorithm}
        </p>
        <Box className='ml-3 h-fit hover:animate-spin' onClick={cycleAlgos}>
          <IconButton>
            <ChangeCircleRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      {spawned &&
        <p className='font-text text-1xl'>
          {`Time taken: ${timeSpent}s`}
        </p>
      }
      {
        !spawned &&
        <FunctionButton key='spawn-button' text={'Create Tiles'} onClick={handleSpawnTiles}/>
      }

      {/* Tileboard */}
      <Box className='w-fit max-w-[80%] flex flex-wrap overflow-hidden justify-center my-2 select-none'
        onMouseDown={beginDragging}
        onMouseUp={stopDragging}
      >
        {
          tiles.map((tile, index) => (
            <div onMouseOver={() => handleHovered(index)}>
              <Box onClick={() => handleVisit(index)}>
                <Tile id={tile} ref={(element) => refs.current[index] = element}/>
              </Box>
            </div>
          ))
        }
      </Box>

      {/* Control Panel */}
      {
        !runningRef.current ?
        <Stack direction='row' className='flex justify-center align-middle items-center m-1'>
          <FunctionButton text={'Reset Board!'} onClick={handleReset}/>
          <ToggleButtonGroup value={mode} exclusive onChange={handleMode} size='small'>
            <Tooltip title='Set Start Point'>
              <ToggleButton value="start">
                <FlagIcon color='success'/>
              </ToggleButton>
            </Tooltip>
            <Tooltip title='Set End Point'>
              <ToggleButton value="end">
                <FlagIcon color='error'/>
              </ToggleButton>
            </Tooltip>
            <Tooltip title='Set Walls'>
              <ToggleButton value="wall">
                <ShieldIcon/>
              </ToggleButton>
            </Tooltip>
            <Tooltip title='Remove Walls'>
              <ToggleButton value="destroy">
                <GppBadIcon/>
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
          <FunctionButton text={'Run Algorithm'} onClick={handleRun}/>
        </Stack> :
        <FunctionButton text={'Stop'} onClick={handleAbort}/>
      }
    </Stack>
  )
}

export default Pathfinding