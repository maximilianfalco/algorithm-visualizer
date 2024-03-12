import { Box } from '@mui/material'
import React from 'react'
import BoidCanvas from '../components/BoidCanvas'

const NatureOfCode = () => {
  return (
    <Box>
      <p className='font-title text-6xl my-2'>
        Boids Algorithm
      </p>
      <p className='font-text text-md my-3'>
        Click and hold to summon an object to avoid!
      </p>
      <BoidCanvas/>
    </Box>
  )
}

export default NatureOfCode