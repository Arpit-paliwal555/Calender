import { useState } from "react";
import { Link } from "react-router-dom";
import { daysOfWeek, getDaysInMonth, getStartDay, generateDays } from "../utils/DateUtils";

const Calender = () => {
    const [month, setMonth] = useState(9); // October (0-indexed)
    const [year, setYear] = useState(2025);

    const daysInMonth = getDaysInMonth(month, year);
    const startDay = getStartDay(month, year);
    const days = generateDays(year, month + 1); // month is 1-based in generateDays
    const calendarCells = [];

    //empty cells before the first day
    for(let i=0;i<startDay;i++){
        calendarCells.push(<div key={`empty-${i}`} className="bg-transparent"></div>);
    }

    //date cells
    calendarCells.push(       
            days.map((day, index) => (
                <Link key={index} to={`/day/${day.id}`}>
                    {/* <div className="border p-2 hover:bg-slate-200 cursor-pointer">
                        {day.label}
                    </div> */}
                    <div key={index} className="border border-gray-300 rounded-lg p-4 h-32 flex flex-col justify-start items-start hover:bg-blue-100 transition">
                    <div className="font-medium text-lg">{index+1}</div>
                    {/* Placeholder for events */}
                    <div className="text-sm text-gray-500 mt-1">No Events</div>
                </div>
                </Link>
            ))
    );

   return(
    <>
        <div className="container mx-auto p-2 border-gray-300 rounded-lg shadow-md mt-10">
            <div className="items-center mb-4">
                <h2 className="text-2xl flex justify-center gap-5 font-semibold text-grey-700">
                    <span>{new Date(year, month).toLocaleString("default", {month:"long"})}</span>
                    <span> {year} </span>
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