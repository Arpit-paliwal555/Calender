import {useState, useRef, useEffect} from "react";
import EventForm from "./EventForm.jsx";
import { useParams } from "react-router-dom";
import { useEventsContext } from "../contexts/EventsContext.jsx";
import { supabase } from "../SupabaseClient.js";
import { useUserContext } from "../contexts/UserContext.jsx";

const Day = ()=>{
    const [showForm,setShowForm] = useState(false);
    const date = useParams().dayId;
    const [selectedDate, setSelectedDate] = useState(date);
    const modalRef = useRef(null);
    const {events, addEvent} = useEventsContext();
    const [eventsByDay, setEventsByDay] = useState([]);
    const [eventsByHour, setEventsByHour] = useState({});
    const {userName: currentUsername} = useUserContext();
    
    const hours = Array.from({length:24},(_,i)=>i+1); //24 hours
    const handleAddEventClick = ()=>{
        setShowForm(true);
    }
    // const handleDayClick = (dayId) => {
    //     setSelectedDate(dayId);
    //     setShowForm(true);
    // };
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

    const handleSaveEvent = async(payload) => {
        // payload can be either {event, recurrence} (from EventForm) or a single event object for backwards compatibility
        console.log('Saved event payload:', payload);
        let eventsToSave = [];
        if (payload && payload.event) {
            const { event, recurrence } = payload;
            if (recurrence) {
                // generate dates between recurrence.startDate and recurrence.endDate based on frequency
                const { generateRecurringDates } = await import('../utils/DateUtils.js');
                const dates = generateRecurringDates(recurrence.startDate, recurrence.endDate, recurrence.frequency);
                eventsToSave = dates.map(d => ({ ...event, date: d }));
            } else {
                eventsToSave = [payload.event];
            }
        } else if (payload) {
            eventsToSave = [payload];
        } else {
            return;
        }

        try {
            const { data, error } = await supabase
                .from('events')
                .insert(eventsToSave);

            if (error) {
                console.error('Error saving events:', error.message);
            } else {
                console.log('Events saved successfully:', data);
            }
        } catch (err) {
            console.error('Unexpected error:', err);
        }

        // update local context/state for each event saved
        eventsToSave.forEach(ev => addEvent(ev));
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
                                                            eventsByHour[hour].map(event => {
                                                            const isCurrentUser = event.username === currentUsername; // Replace with actual current user's username
                                                                const bgColor = isCurrentUser ? "bg-blue-300" : "bg-emerald-300";

                                                                return (
                                                                    <div key={event.title} className={`${bgColor} p-2 text-xs rounded mb-1 flex gap-3`}>
                                                                        <b>{event.title}</b> at <b>{event.time}</b>
                                                                        <span>Created by: <b>{event.username}</b></span>
                                                                    </div>
                                                                );

                                                            })
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