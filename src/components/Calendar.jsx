import { useState, useEffect, use } from "react";
import { Link } from "react-router-dom";
import { daysOfWeek, getDaysInMonth, getStartDay, generateDays, fetchHolidays } from "../utils/DateUtils";
import nextArrow from "../assets/arrow-next.svg";
import prevArrow from "../assets/arrow-prev.svg";
import { useEventsContext } from "../contexts/EventsContext";

const Calender = () => {
    const [month, setMonth] = useState(9); // October (0-indexed)
    const [year, setYear] = useState(2025);
    const [calendarCells, setCalendarCells] = useState([]);
    const [holidays, setHolidays] = useState({});
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
        const fetchAndSetHolidays = async () => {
            const festivalMap = {};
            const data = await fetchHolidays(year);
            data.forEach(holiday => {
                const date = holiday.date.iso; // e.g., "2025-10-02"
                festivalMap[date] = holiday.name;
            });
            setHolidays(festivalMap);
            console.log("holidays:", festivalMap);
        };
        fetchAndSetHolidays();
    }, [year]);
    
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
        //empty cells before start day
        for(let i=0;i<startDay;i++){
            cells.push(<div key={`empty-${i}`} className="bg-transparent"></div>);
        }
        //date cells
        cells.push(       
                days.map((day, index) => (
                    <Link key={index} to={`/day/${day.id}`}>
                        <div key={index} className="border border-gray-300 rounded-lg p-4 h-32 flex flex-col justify-start items-start hover:bg-zinc-200 transition">
                        <div className={`font-medium text-lg ${day.dayName=='Sun'?'text-emerald-600' : ''}`}>{index+1}</div>
                        {holidays[day.id] && (
                            <div className="text-xs line-clamp-2 text-red-500 italic">🎉{holidays[day.id]}</div>
                        )}
                        <div className="mt-2 w-full flex flex-col gap-1">
                        {temp[day.id]?.length>0?(
                            <>
                            {temp[day.id].slice(0,2).map(event => (
                                <div key={event.title} className="border border-emerald-300 bg-emerald-200 px-2 py-1 rounded italic text-xs w-full overflow-hidden text-ellipsis whitespace-nowrap">
                                    {event.title} at {event.time}
                                </div>
                            ))}
                            {(temp[day.id].length > 2 && (
                                <div className="text-xs text-grey-500 mt-1">+{temp[day.id].length-2} more</div>
                            ))}
                            </>
                        ):(<div className="text-sm text-gray-500 mt-1">No Event.</div>)}
                        </div>
                    </div>
                    </Link>
                ))
        );
        setCalendarCells(cells);
    }, [month, year, events, holidays]);


   return(
    <>
        <div className="container mx-auto p-2 border-gray-300 rounded-lg shadow-md mt-10">
            <div className="items-center mb-4">
                <h2 className="text-2xl flex justify-center gap-5 font-semibold text-grey-700">
                    <button onClick={handleMonthDecrement}><img className="w-5 h-10" src={prevArrow} alt="" /></button>
                    <span className="w-32 inline-block text-center">{new Date(year, month).toLocaleString("default", {month:"long"})}</span>
                    <button onClick={handleMonthIncrement}><img className="w-5 h-10" src={nextArrow} alt="" /></button>
                    <button onClick={handleYearDecrement}><img className="w-5 h-10" src={prevArrow} alt="" /></button>
                    <span> {year} </span>
                    <button onClick={handleYearIncrement}><img className="w-5 h-10" src={nextArrow} alt="" /></button>
                </h2>
                {/*need to add month/year selectors */}
            </div>
            {/*day names*/}
            <div className="grid grid-cols-7 gap-2 text-center font-medium mb-2">
                {daysOfWeek.map((day)=>(
                    <div key={day} className={`text-grey-700 ${day === 'Sun' ? 'text-emerald-600' : ''}`}>{day}</div>
                ))}
            </div>
            {/*calendar grid*/}
            <div className="grid grid-cols-7 md:grid-cols-7 sm:grid-cols-2 gap-2 text-grey-700">
                {calendarCells}
            </div>
        </div> 
    </>
    )
    
}
export default Calender;