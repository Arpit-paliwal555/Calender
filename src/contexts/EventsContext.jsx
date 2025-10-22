import {createContext, useContext, useState} from "react";
import {currMonth, currYear} from "../utils/DateUtils";
import { useEffect } from "react";
import { supabase } from "../SupabaseClient.js";

const EventsContext = createContext();

export const useEventsContext = ()=>useContext(EventsContext);

export const EventsProvider = ({children})=>{
    const [events, setEvents] = useState([]);
    const [month, setMonth] = useState(currMonth); // October (0-indexed)
    const [year, setYear] = useState(currYear);

    const changeMonth = (newMonth)=>{
        setMonth(newMonth);
    }
    const changeYear = (newYear)=>{
        setYear(newYear);
    }
    const addEvent = (event)=>{
        setEvents([...events, event]);
    }
    const removeEvent = (eventId) => {
            setEvents(events.filter(event => `${event.title}-${event.date}` !== eventId));
    }
    useEffect(() => {
    const fetchEvents = async () => {
        const { data, error } = await supabase
                .from('events')
                .select('*');

            if (error) {
                console.error('Error fetching events:', error);
            } else {
                setEvents(data);
            }
        };

        fetchEvents();
    }, [month, year]);
    return (
        <EventsContext.Provider value={{events, addEvent, removeEvent, month, year, changeMonth, changeYear}}>
            {children}
        </EventsContext.Provider>
    )
}