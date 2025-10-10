import {createContext, useContext, useState} from "react";

const EventsContext = createContext();

export const useEventsContext = ()=>useContext(EventsContext);

export const EventsProvider = ({children})=>{
    const [events, setEvents] = useState([]);
    const addEvent = (event)=>{
        setEvents([...events, event]);
    }
    const removeEvent = (eventId) => {
            setEvents(events.filter(event => `${event.title}-${event.date}` !== eventId));
    }
    return (
        <EventsContext.Provider value={{events, addEvent, removeEvent}}>
            {children}
        </EventsContext.Provider>
    )
}