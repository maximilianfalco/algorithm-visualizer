import { React } from 'react'
import { ReactP5Wrapper } from 'react-p5-wrapper'
import sketch from './sketch'

const BoidCanvas = (props) => {
  return (
    <ReactP5Wrapper
      sketch={sketch}
      running={props.checked}
      separation={props.separation}
      alignment={props.alignment}
      cohesion={props.cohesion}
    />
  )
}

export default BoidCanvas