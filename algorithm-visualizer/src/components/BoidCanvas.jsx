import React from 'react'
import { ReactP5Wrapper } from 'react-p5-wrapper'
import sketch from './sketch'
import { Box, Typography } from '@mui/material'

const BoidCanvas = () => {
  
  return (
    <Box className='flex justify-center p-10'>
      <Box>
        <p className='text-4xl mb-2'>
          Boids Algorithm
        </p>
        <Typography>
          Click and hold to summon an object to avoid!
        </Typography>
      </Box>
      <ReactP5Wrapper
        sketch={sketch}
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      />
    </Box>
  )
}

export default BoidCanvas