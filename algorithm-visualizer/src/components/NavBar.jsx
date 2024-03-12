import React from 'react'
import { Box, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { fixedURL } from '../App'

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Box className='h-full w-full flex justify-center items-center'>
      <Stack direction='row'>
        <Box
          className='font-button-text cursor-pointer p-1 rounded-md mx-4 hover:bg-slate-200'
          onClick={() => { navigate(`${fixedURL}/`) }}
        >
          Home
        </Box>
        <Box
          className='font-button-text cursor-pointer p-1 rounded-md mx-4 hover:bg-slate-200'
          onClick={() => { navigate(`${fixedURL}/natureofcode`) }}
        >
          Nature of Code
        </Box>
        <Box
          className='font-button-text cursor-pointer p-1 rounded-md mx-4 hover:bg-slate-200'
          onClick={() => { navigate(`${fixedURL}/pathfinding`) }}
        >
          Pathfinding Algorithms
        </Box>
      </Stack>
    </Box>
  )
}

export default NavBar