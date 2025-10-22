import { useEffect, useState } from "react";
import { useEventsContext} from "../contexts/EventsContext";

const EventsList = () => {
    const {events, removeEvent} = useEventsContext();
    const [todaysEvents, setTodaysEvents] = useState([]);
    const [tomorrowsEvents, setTomorrowsEvents] = useState([]);
    const [laterEvents, setLaterEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);

    
    useEffect(() => {
        console.log("Events updated:", events);

        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        const dayAfterTomorrow = new Date();
        dayAfterTomorrow.setDate(today.getDate() + 2);

        setTodaysEvents(events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === today.toDateString();
        }));

        setTomorrowsEvents(events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === tomorrow.toDateString();
        }));

        setLaterEvents(events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= dayAfterTomorrow;
        }));

        setPastEvents(events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate < today;
        }));
    }, [events]);
    
    
    if(!events || events.length==0) 
        return <div className="flex items-center justify-center h-64 text-gray-500">
                    No events to display.
               </div>

    return (
        <div>
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Events List</h2>
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Today's Events</h3>
                {todaysEvents.length === 0 ? (
                    <p>No events for today.</p>
                ) : (
                    <ul className="list-disc list-inside">
                        {todaysEvents.map((event, index) => (                            
                        <div key={event.id || `${event.title}-${event.date}`} className="border border-gray-300 flex justify-between items-center rounded-lg p-4 m-2 bg-white shadow-sm">
                            <div className="text-gray-800">
                                {event.title} at {event.time} on {event.date}
                            </div>
                            {event.username?<div>Created by : {event.username}</div> : <div>No creator info</div>}
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-200"
                                onClick={() => removeEvent(`${event.title}-${event.date}`)}
                            >
                                Remove
                            </button>
                        </div>
                        )  )}
                    </ul>
                )}
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Tomorrow's Events</h3>
                {tomorrowsEvents.length === 0 ? (
                    <p>No events for tomorrow.</p>
                ) : (
                    <ul className="list-disc list-inside">
                        {tomorrowsEvents.map((event, index) => (                            
                            <div key={event.id || `${event.title}-${event.date}`} className="border border-gray-300 flex justify-between items-center rounded-lg p-4 m-2 bg-white shadow-sm">
                                <div className="text-gray-800">
                                    {event.title} at {event.time} on {event.date}
                                </div>
                                {event.username?<div>Created by : {event.username}</div> : <div>No creator info</div>}
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-200"
                                    onClick={() => removeEvent(`${event.title}-${event.date}`)}
                                >
                                    Remove
                                </button>
                            </div>
                        )  )}
                    </ul>
                )}
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Later</h3>
                {laterEvents.length === 0 ? (
                    <p>No events Later.</p>
                ) : (
                    <ul className="list-disc list-inside">
                        {laterEvents.map((event, index) => (                            
                            <div key={event.id || `${event.title}-${event.date}`} className="border border-gray-300 flex justify-between items-center rounded-lg p-4 m-2 bg-white shadow-sm">
                                <div className="text-gray-800">
                                    {event.title} at {event.time} on {event.date}
                                </div>
                                {event.username?<div>Created by : {event.username}</div> : <div>No creator info</div>}
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-200"
                                    onClick={() => removeEvent(`${event.title}-${event.date}`)}
                                >
                                    Remove
                                </button>
                            </div>
                        )  )}
                    </ul>
                )}
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Past Events</h3>
                {pastEvents.length === 0 ? (
                    <p>No Past Events.</p>
                ) : (
                    <ul className="list-disc list-inside">
                        {pastEvents.map((event, index) => (
                        <div key={event.id || `${event.title}-${event.date}`} className="border border-gray-300 flex justify-between items-center rounded-lg p-4 m-2 bg-white shadow-sm">
                            <div className="text-gray-800">
                                {event.title} at {event.time} on {event.date}
                            </div>
                            {event.username?<div>Created by : {event.username}</div> : <div>No creator info</div>}
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-200"
                                onClick={() => removeEvent(`${event.title}-${event.date}`)}
                            >
                                Remove
                            </button>
                        </div>
                        )  )}
                    </ul>
                )}
            </div>
            
        </div> 
        </div> 
        )  
}
export default EventsList;