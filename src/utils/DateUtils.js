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

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const fetchHolidays = async (year) => {
    const cacheKey = `holidays_${year}`;
    const cached = localStorage.getItem(cacheKey);
    if(cached){
        try{
            const {data, timestamp} = JSON.parse(cached);
            const now = new Date().getTime();
            if(now - timestamp < CACHE_DURATION){
                return data;
            }else{
                localStorage.removeItem(cacheKey);//expired cache
            }
        }catch(e){
            console.warn("Invalid cache format:",e);
            localStorage.removeItem(cacheKey);
        };
    }
        try{
            const response = await fetch(`${apiURL}?api_key=${apiKey}&country=IN&year=${year}`);
            const result = await response.json();
            const holidays = result.response.holidays;

            //store in cache with timestamp
            localStorage.setItem(cacheKey, JSON.stringify({data: holidays, timestamp: new Date().getTime()}));
            return holidays;
        }catch(e){
            console.error("Error fetching holidays:", e);
            return [];
        }
};

/**
 * Generate recurring dates between startDate and endDate.
 * startDate and endDate are strings in 'yyyy-MM-dd' or Date objects.
 * frequency: 'daily' | 'weekly' | 'monthly'
 * Returns array of date strings formatted as 'yyyy-MM-dd'.
 */
import { parseISO, addDays, addWeeks, addMonths, isAfter, format as formatDate, isValid } from 'date-fns';

const generateRecurringDates = (startDate, endDate, frequency = 'daily', options = {}) => {
    let current = typeof startDate === 'string' ? parseISO(startDate) : startDate;
    const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
    if(!isValid(current) || !isValid(end)) return [];

    const dates = [];
    while(!isAfter(current, end)){
        dates.push(formatDate(current, 'yyyy-MM-dd'));
        if(frequency === 'daily'){
            current = addDays(current, 1);
        }else if(frequency === 'weekly'){
            current = addWeeks(current, 1);
        }else if(frequency === 'monthly'){
            current = addMonths(current, 1);
        }else{
            // default to daily if unknown frequency
            current = addDays(current, 1);
        }
    }
    return dates;
}

export {currMonth, currYear, daysOfWeek, getDaysInMonth, getStartDay, generateDays, fetchHolidays, generateRecurringDates};