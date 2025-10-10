import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import Calender from './components/Calendar';
import Day from './components/Day';
import { EventsProvider } from './contexts/EventsContext';
import EventsList from './components/EventsList.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <EventsProvider>
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Calender></Calender>}/>
        <Route path='/day/:dayId' element={<Day></Day>}/>
        <Route path='/events' element={<EventsList></EventsList>}/>
        <Route path='*' element={<div>404 Not Found</div>}/>
      </Routes>
    </Router>
    </EventsProvider>
    </>
  )
}

export default App
