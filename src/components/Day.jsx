import {useState, useRef, useEffect} from "react";
import EventForm from "./EventForm.jsx";
import { useParams } from "react-router-dom";
import { useEventsContext } from "../contexts/EventsContext.jsx";
import { fi } from "date-fns/locale";

const Day = ()=>{
    const [showForm,setShowForm] = useState(false);
    const date = useParams().dayId;
    const [selectedDate, setSelectedDate] = useState(date);
    const modalRef = useRef(null);
    const {events, addEvent} = useEventsContext();
    const [eventsByDay, setEventsByDay] = useState([]);
    const [eventsByHour, setEventsByHour] = useState({});
    
    const hours = Array.from({length:24},(_,i)=>i+1); //24 hours
    const handleAddEventClick = ()=>{
        setShowForm(true);
    }

    const handleDayClick = (dayId) => {
        setSelectedDate(dayId);
        setShowForm(true);
    };
    useEffect(() => {
        const filteredEvents = events.filter(event => event.date === selectedDate);
        setEventsByDay(filteredEvents);
    }, [events, selectedDate]);

    useEffect(() => {
        const temp = {};    
        if(eventsByDay.length===0){
            console.log("No events for this day");
        }
        eventsByDay.forEach(event => {
            const hour = new Date(`${event.date}T${event.time}`).getHours();
            if (!temp[hour]) temp[hour] = [];
            temp[hour].push(event);
        });
        setEventsByHour(temp);

    }, [eventsByDay])

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowForm(false);
            }
        };
        if (showForm) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showForm]);

    const handleCloseForm = () => setShowForm(false);

    const handleSaveEvent = (event) => {
        console.log('Saved event:', event);
        // TODO: persist event to state or backend
        addEvent(event);
        setShowForm(false);
    }

    return (
        <>
        <div className="relative">
        {showForm && (
            <EventForm
                modalRef={modalRef}
                selectedDate={selectedDate}
                onClose={handleCloseForm}
                onSave={handleSaveEvent}
            />
        )}            
        {hours.map((hour) => (
                        <div key={hour} className="border border-grey-300 flex flex-row">
                            <div className="font-thin text-sm w-12 text-center">{hour}</div>
                            <div className="flex flex-col w-full">
                                <div className="w-full h-16 cursor-pointer overflow-y-auto hover:bg-slate-100" onClick={handleAddEventClick}>                                                                        
                                    {eventsByHour[hour]?.length > 0 ? (
                                                            eventsByHour[hour].map(event => (
                                                                <div key={event.title} className="bg-emerald-300 p-2 text-xs rounded mb-1">
                                                                    <b>{event.title}</b> at <b>{event.time}</b>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="text-gray-400 text-sm">No event.</div>
                                                        )}

                                </div>
                                {/* <div className="w-full h-6 cursor-pointer hover:bg-slate-100" onClick={handleAddEventClick}>
                            
                                </div> */}
                            </div>
                        </div>
                    ))}
        </div>
        </>
    )
}
export default Day;