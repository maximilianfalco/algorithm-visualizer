import React from 'react'
import { Box } from '@mui/material'

const FunctionButton = (props) => {
  return (
    <Box
      className='font-button-text cursor-pointer p-1 px-2 rounded-md mx-4 hover:bg-slate-200'
      onClick={props.onClick}
    >
      {props.text}
    </Box>
  )
}

export default FunctionButton