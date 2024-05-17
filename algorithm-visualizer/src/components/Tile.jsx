import { Box } from '@mui/material'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

const Tile = forwardRef(function Tile(props, ref) {
  const [background, setBackground] = useState('#808080');
  useImperativeHandle(ref, () => {
    return {
      visit () {
        setBackground('#2ea6d1');
      },
      addToQueue () {
        setBackground('#de2c62');
      },
      reset () {
        setBackground('#808080');
      }
    };
  }, []);

  return (
    <Box 
      className='w-10 h-10 rounded-md m-1 cursor-pointer' 
      sx={{ backgroundColor: background }}>
      {props.id}
    </Box>
  )
});

export default Tile