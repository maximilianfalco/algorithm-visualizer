import { Box, Button, Stack } from '@mui/material'
import React, { useRef, useState } from 'react'
import Tile from '../components/Tile'

const Pathfinding = () => {
  const count = 100;
  const refs = useRef({});
  const [tiles, setTiles] = useState([]);
  let visited = [];

  const handleSpawnTiles = () => {
    const temp = [];
    for(let i = 0; i < count; i++) {
      temp.push(i);
    }
    setTiles(temp);
  }

  const addToQueue = (index) => {
    if (visited.includes(index)) return;
    refs.current[index].addToQueue();
  }

  const handleVisit = (index) => {
    if (visited.includes(index)) return;
    refs.current[index].visit();
    visited.push(index);

    if (index - 10 >= 0) {
      addToQueue(index - 10);
    }
    if (index + 10 < count) {
      addToQueue(index + 10);
    }
    const currentRow = Math.floor(index / 10)
    const leftRow = Math.floor((index - 1) / 10)
    const rightRow = Math.floor((index + 1) / 10)

    if (currentRow === leftRow) {
      addToQueue(index - 1);
    }
    if (currentRow === rightRow) {
      addToQueue(index + 1);
    }
  }

  const handleReset = () => {
    visited = [];
    for(let i = 0; i < count; i++) {
      refs.current[i].reset();
    }
  }

  return (
    // <Stack className='flex items-center justify-center'>
    //   {/* <Box className='mt-10 font-text'>
    //     more algorithms to be implemented...
    //   </Box> */}
    //   <Button onClick={handleSpawnTiles}>Spawn Tiles</Button>
    //   <Box className='w-[30rem] flex flex-wrap'>
    //     {
    //       tiles.map((tile, index) => (
    //         <Box onClick={() => handleVisit(index)}>
    //           <Tile id={tile} ref={(element) => refs.current[index] = element}/>
    //         </Box>
    //       ))
    //     }
    //   </Box>
    //   <Button onClick={handleReset}>Reset Board!</Button>
    // </Stack>
    <div>

    </div>
  )
}

export default Pathfinding