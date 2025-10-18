import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import Calender from './components/Calendar';
import Day from './components/Day';
import { EventsProvider } from './contexts/EventsContext';
import EventsList from './components/EventsList.jsx';
import { onAuthStateChange, signOut } from './auth.js';
import AuthPage from './components/Authpage.jsx';

function App() {  
  const [user, setUser] = useState(null);

  useEffect(() => {
  const { data: { subscription } } = onAuthStateChange((event, session) => {
    setUser(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
  }, []);


  return (
    <>
    <EventsProvider>
    <Router>
      <Navbar user={user} onSignOut={signOut}></Navbar>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path='/home' element={<Calender></Calender>}/>
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
