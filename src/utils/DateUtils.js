import { format, endOfMonth, eachDayOfInterval } from 'date-fns';

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

export {currMonth, currYear, daysOfWeek, getDaysInMonth, getStartDay, generateDays};