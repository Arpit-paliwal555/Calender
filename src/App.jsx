import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import Calender from './components/Calendar';
import Day from './components/Day';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Calender></Calender>}/>
        <Route path='/day/:dayId' element={<Day></Day>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
