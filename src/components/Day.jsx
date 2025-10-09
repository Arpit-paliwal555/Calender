import {useState, useRef, useEffect} from "react";
import EventForm from "./EventForm.jsx";

const Day = ()=>{
    const [showForm,setShowForm] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const modalRef = useRef(null);
    const hours = Array.from({length:24},(_,i)=>i+1); //24 hours
    const handleAddEventClick = ()=>{
        setShowForm(true);
    }

    const handleDayClick = (dayId) => {
        setSelectedDate(dayId);
        setShowForm(true);
    };

    
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

    return (
        <>
        <div className="relative">
        {showForm && <EventForm modalRef={modalRef} selectedDate={selectedDate} />}            
        {hours.map((hour) => (
                        <div key={hour} className="border border-grey-300 flex flex-row">
                            <div className="font-thin text-sm w-12 text-center">{hour}</div>
                            <div className="flex flex-col w-full">
                                <button className="w-full h-6 cursor-pointer hover:bg-slate-100" onClick={handleAddEventClick}>
                                    {/* Optional: Label like "00 - 30" */}
                                </button>
                                <button className="w-full h-6 cursor-pointer hover:bg-slate-100">
                                    {/* Optional: Label like "30 - 00" */}
                                </button>
                            </div>
                        </div>
                    ))}
        </div>
        </>
    )
}
export default Day;