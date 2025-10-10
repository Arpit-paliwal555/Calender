import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { daysOfWeek, getDaysInMonth, getStartDay, generateDays } from "../utils/DateUtils";
import nextArrow from "../assets/arrow-next.svg";
import prevArrow from "../assets/arrow-prev.svg";
import { useEventsContext } from "../contexts/EventsContext";

const Calender = () => {
    const [month, setMonth] = useState(9); // October (0-indexed)
    const [year, setYear] = useState(2025);
    const [calendarCells, setCalendarCells] = useState([]);
    const {events} = useEventsContext();

    const handleMonthDecrement = () => {
        if (month === 0) {
            setMonth(11);
        }else{
            setMonth(month - 1);
        }
    };
    const handleMonthIncrement = () => {
        if (month === 11) {
            setMonth(0);
        }else{
            setMonth(month + 1);
        }
    };

    const handleYearDecrement = () => {
        setYear(year - 1);
    }
    const handleYearIncrement = () => {
        setYear(year + 1);
    }
    
    useEffect(() => {
        const daysInMonth = getDaysInMonth(month, year);
        const startDay = getStartDay(month, year);
        const days = generateDays(year, month + 1);
        const cells = [];
        const temp = {};
        events.forEach(event=>{
            temp[event.date] = temp[event.date] || [];
            temp[event.date].push(event);
            console.log("eventdate:", event.date);
        });
        //empty cells before the first day
        for(let i=0;i<startDay;i++){
            cells.push(<div key={`empty-${i}`} className="bg-transparent"></div>);
        }

        //date cells
        cells.push(       
                days.map((day, index) => (
                    <Link key={index} to={`/day/${day.id}`}>
                        <div key={index} className="border border-gray-300 rounded-lg p-4 h-32 flex flex-col justify-start items-start hover:bg-blue-100 transition">
                        <div className="font-medium text-lg">{index+1}</div>
                        {temp[day.id]?.length>0?(
                            temp[day.id].map(event => (
                                <div key={event.title} className="">
                                    {event.title} at {event.time}
                                </div>
                            ))
                        ):(<div className="text-sm text-gray-500 mt-1">No Events.</div>)}
                        
                    </div>
                    </Link>
                ))
        );
        setCalendarCells(cells);
    }, [month, year, events]);


   return(
    <>
        <div className="container mx-auto p-2 border-gray-300 rounded-lg shadow-md mt-10">
            <div className="items-center mb-4">
                <h2 className="text-2xl flex justify-center gap-5 font-semibold text-grey-700">
                    <button onClick={handleMonthDecrement}><img className="w-5 h-10" src={prevArrow} alt="" /></button>
                    <span>{new Date(year, month).toLocaleString("default", {month:"long"})}</span>
                    <button onClick={handleMonthIncrement}><img className="w-5 h-10" src={nextArrow} alt="" /></button>
                    <button onClick={handleYearDecrement}><img className="w-5 h-10" src={prevArrow} alt="" /></button>
                    <span> {year} </span>
                    <button onClick={handleYearIncrement}><img className="w-5 h-10" src={nextArrow} alt="" /></button>
                </h2>
                {/*need to add month/year selectors */}
            </div>
            {/*day names*/}
            <div className="grid grid-cols-7 gap-2 text-center font-medium text-grey-700 mb-2">
                {daysOfWeek.map((day)=>(
                    <div key={day}>{day}</div>
                ))}
            </div>
            {/*calendar grid*/}
            <div className="grid grid-cols-7 gap-2 text-grey-700">
                {calendarCells}
            </div>
        </div> 
    </>
    )
    
}
export default Calender;