import { format, endOfMonth, eachDayOfInterval } from 'date-fns';

const apiURL = import.meta.env.VITE_CALENDERIFIC_API_URL;
const apiKey = import.meta.env.VITE_CALENDERIFIC_API_KEY;
const date  = new Date();
const currMonth = date.getMonth();
const currYear  = date.getFullYear();

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


const generateDays = (year, month) => {
    // month is 1-based (e.g., October = 10)
    const start = new Date(year, month - 1, 1);
    const end = endOfMonth(start);

    const days = eachDayOfInterval({ start, end }).map((date) => ({
        id: format(date, 'yyyy-MM-dd'), // e.g., "2025-10-08"
        label: format(date, 'EEE dd'),  // e.g., "Wed 08"
        dayName: format(date, 'EEE'), // e.g., "Wed"
    }));

    return days;
};

const getDaysInMonth = (month, year) => {
return new Date(year, month + 1, 0).getDate();
};

const getStartDay = (month, year) => {
return new Date(year, month, 1).getDay();
};

const fetchHolidays = async (year) => {
    try {
        const response = await fetch(`${apiURL}?api_key=${apiKey}&country=IN&year=${year}`);
        const data = await response.json();
        return data.response.holidays;
    } catch (error) {
        console.error("Error fetching holidays:", error);
        return [];
    }
};

export {currMonth, currYear, daysOfWeek, getDaysInMonth, getStartDay, generateDays, fetchHolidays};