import { Box, Link, Stack } from '@mui/material'
import React from 'react'
import GitHubIcon from '../assets/github-mark-dark.png'
import LinkedInIcon from '../assets/linkedin_icon.png'
import IconButton from '../components/IconButton'

const githubLink = 'https://github.com/maximilianfalco/algorithm-visualizer';
const linkedinLink = 'https://www.linkedin.com/in/maximilian-falco-widjaya/';

const Home = () => {
  return (
    <Box className='h-full flex justify-center items-center'>
      <Stack className='flex flex-wrap align-middle items-center leading-loose'>
        <p className='font-title text-6xl w-3/4'>
          Welcome to Algorithm Visualizer!
        </p>
        <Box className='flex justify-center'>
          <p className='font-text text-sm mt-5 mb-3 w-1/2'>
            This website simply utilizes and showcases various algorithms sourced from publicly available and free sources like Wikipedia. Additionally, some of the code used to depict these algorithms may be based on pre-existing samples also available to the public, I will credit the original owner within the source code. I do not claim ownership over these algorithms or the associated code. Please feel free to reach out to me with any concerns.
          </p>
        </Box>
        <Stack direction='row' spacing={1} className='flex justify-center'>
          <Link href={githubLink}>
            <IconButton icon={GitHubIcon} title='Souce Code'/>
          </Link>
          <Link href={linkedinLink}>
            <IconButton icon={LinkedInIcon} title='LinkedIn'/>
          </Link>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Home