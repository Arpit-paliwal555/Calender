import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import Calender from './components/Calendar';
import Day from './components/Day';
import { EventsProvider } from './contexts/EventsContext';
import { UserContextProvider } from './contexts/UserContext.jsx';
import EventsList from './components/EventsList.jsx';
import { onAuthStateChange, signOut } from './auth.js';
import AuthPage from './components/Authpage.jsx';
import {ProtectedRoute} from './components/ProtectedRoute.jsx';

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
    <UserContextProvider>
    <EventsProvider>
      <Router>
        <Navbar user={user} onSignOut={signOut} />
        <Routes>
          <Route path="/" element={<AuthPage />} />
          
          <Route
            path="/home"
            element={
              <ProtectedRoute user={user}>
                <Calender />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/day/:dayId"
            element={
              <ProtectedRoute user={user}>
                <Day />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/events"
            element={
              <ProtectedRoute user={user}>
                <EventsList />
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </EventsProvider>
    </UserContextProvider>
    </>
  )
}

export default App
