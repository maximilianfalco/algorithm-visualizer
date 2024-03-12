import React from 'react'
import { ReactP5Wrapper } from 'react-p5-wrapper'
import sketch from './sketch'

const BoidCanvas = () => {
  
  return (
    <ReactP5Wrapper sketch={sketch}/>
  )
}

export default BoidCanvas