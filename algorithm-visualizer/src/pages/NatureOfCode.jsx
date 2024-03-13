import { Box, Checkbox, Slider } from '@mui/material'
import { React, useState } from 'react'
import BoidCanvas from '../components/BoidCanvas'

const NatureOfCode = () => {
  const [checked, setChecked] = useState(true);
  const [separation, setSaperation] = useState(15);
  const [alignment, setAlignment] = useState(50);
  const [cohesion, setCohesion] = useState(50);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeSeparation = (event) => {
    setSaperation(event.target.value);
  }

  const handleChangeAlignment = (event) => {
    setAlignment(event.target.value);
  }

  const handleChangeCohesion = (event) => {
    setCohesion(event.target.value);
  }

  return (
    <Box>
      <p className='font-title text-6xl my-2'>
        Boids Algorithm
      </p>
      <p className='font-text text-md my-3'>
        Click and hold to summon an object to avoid!
      </p>
      <BoidCanvas
        checked={checked}
        separation={separation}
        alignment={alignment}
        cohesion={cohesion}
      />
      <Box className='mt-[416px]'>
        <Box className='flex justify-center items-center'>
          <Checkbox defaultChecked onChange={handleChange}/>
          <p className='font-text'>Click to run the algorithm!</p>
        </Box>
        <Box className='flex justify-center items-center'>
          <Slider
            defaultValue={15}
            onChange={handleChangeSeparation}
            min={0}
            max={30}
            sx={{ width: '5rem' }}
            size='small'
            valueLabelDisplay='auto'
          />
          <p className='font-text mx-3 text-sm'>Separation</p>
          <Slider
            defaultValue={50}
            onChange={handleChangeAlignment}
            min={25}
            max={75}
            sx={{ width: '5rem' }}
            size='small'
            valueLabelDisplay='auto'
          />
          <p className='font-text mx-3 text-sm'>Alignment</p>
          <Slider
            defaultValue={50}
            onChange={handleChangeCohesion}
            min={25}
            max={75}
            sx={{ width: '5rem' }}
            size='small'
            valueLabelDisplay='auto'
          />
          <p className='font-text mx-3 text-sm'>Cohesion</p>
        </Box>
      </Box>
    </Box>
  )
}

export default NatureOfCode