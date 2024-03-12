import { Box } from '@mui/material'
import React from 'react'

const IconButton = (props) => {
  return (
    <Box
      className='p-3 rounded-full cursor-pointer hover:bg-slate-200 transition-all ease-in-out duration-1000' 
      title={props.title}
    >
      <img
        src={props.icon}
        className='w-9'
        alt={props.title}
      />
    </Box>
  )
}

export default IconButton