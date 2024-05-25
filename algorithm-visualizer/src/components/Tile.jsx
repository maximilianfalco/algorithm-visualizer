import { Box } from '@mui/material'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import useStateRef from 'react-usestateref';
import sleep from './HelperFunctions';
import { ANIMATIONDELAY, DEFAULT, END, HIGHLIGHT, QUEUED, START, VISITED, WALL } from './Constants';

const Tile = forwardRef(function Tile(props, ref) {
  const [background, setBackground] = useState(DEFAULT);
  const [special, setSpecial, specialRef] = useStateRef(false);
  const [wall, setWall, wallRef] = useStateRef(false);
  useImperativeHandle(ref, () => {
    return {
      async visit () {
        if (special || wall) return;
        setBackground(HIGHLIGHT);
        await sleep(ANIMATIONDELAY);
        setBackground(VISITED);
      },
      addToQueue () {
        if (special || wall) return;
        setBackground(QUEUED);
      },
      reset () {
        setBackground(DEFAULT);
        setSpecial(false);
        setWall(false);
      },
      softReset () {
        if (specialRef.current || wallRef.current) return;
        this.reset();
      },
      setStart () {
        setBackground(START);
        setSpecial(true);
      },
      setEnd () {
        setBackground(END);
        setSpecial(true);
      },
      markWall () {
        setBackground(WALL);
        setWall(true);
        setSpecial(true);
      },
      isWall () {
        return wallRef.current;
      },
      isSpecial () {
        return specialRef.current;
      },
      backtrack () {
        setBackground(HIGHLIGHT);
      }
    };
  });

  return (
    <Box 
      className='w-TILE h-TILE rounded-sm m-[0.10rem] cursor-pointer' 
      sx={{ backgroundColor: background }}>
      {/* {props.id} */}
    </Box>
  )
});

export default Tile