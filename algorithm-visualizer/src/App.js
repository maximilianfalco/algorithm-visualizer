import './App.css';
import NavBar from './components/NavBar';
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pathfinding from './pages/Pathfinding';
import NatureOfCode from './pages/NatureOfCode';

export const fixedURL = '/algorithm-visualizer'

function App() {
  return (
    <div className="App">
      <Box className='h-screen flex flex-wrap justify-center'>
        <Box className='h-16 w-full fixed'>
          <NavBar/>
        </Box>
        {/* Page Content */}
        <Box className='mt-16 flex-grow'>
          <Routes>
            <Route path={`${fixedURL}/`} element={<Home/>}/>
            <Route path={`${fixedURL}/natureofcode`} element={<NatureOfCode/>}/>
            <Route path={`${fixedURL}/pathfinding`} element={<Pathfinding/>}/>
          </Routes>
        </Box>
      </Box>
    </div>
  );
}

export default App;
