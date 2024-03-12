import './App.css';
import NavBar from './components/NavBar';
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';

export const fixedURL = '/algorithm-visualizer'

function App() {
  return (
    <div className="App">
      <Box className='h-screen'>
        <Box className='h-12'>
          <NavBar/>
        </Box>
        <Box className='h-dvh'>
          <Routes>
            <Route path={`${fixedURL}/`} element={<Page1/>}/>
            <Route path={`${fixedURL}/2`} element={<Page2/>}/>
          </Routes>
        </Box>
      </Box>
    </div>
  );
}

export default App;
