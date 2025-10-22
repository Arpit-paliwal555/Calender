import { useState } from 'react';
import { useUserContext } from '../contexts/UserContext.jsx';

const EventForm = ({ modalRef, selectedDate, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const {user, userName} = useUserContext();
    const [isRecurring, setIsRecurring] = useState(false);
    const [frequency, setFrequency] = useState('daily');
    const [rangeStart, setRangeStart] = useState('');
    const [rangeEnd, setRangeEnd] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Name in EventForm:", userName);
        console.log("User ID in EventForm:", user.id);
        const event = {
            //userId: user.id,
            username: userName,
            title: title.trim(),
            time,
            description: description.trim(),
            category: selectedCategory,
            date: selectedDate,
        };
        if (onSave) onSave(event);
        // reset local state
        setTitle('');
        setTime('');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-white p-6 rounded shadow-lg w-96 relative">
                <button
                    aria-label="Close modal"
                    onClick={() => onClose && onClose()}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>

                <h2 className="text-lg font-semibold mb-4">Add Event for {selectedDate ?? 'selected date'}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Event Title"
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        placeholder="Event Description"
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        type="time"
                        className="border p-2 rounded"
                        required
                    />
                    <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                        <option value="All">All</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Festival">Festival</option>
                    </select>

                    <label className="flex items-center gap-2 mt-2">
                        <input type="checkbox" checked={isRecurring} onChange={(e)=>setIsRecurring(e.target.checked)} />
                        <span className="text-sm">Recurring event</span>
                    </label>

                    {isRecurring && (
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <label className="text-sm">Frequency:</label>
                                <select value={frequency} onChange={(e)=>setFrequency(e.target.value)}>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <label className="text-sm">Start:</label>
                                <input type="date" value={rangeStart} onChange={(e)=>setRangeStart(e.target.value)} required className="border p-1 rounded" />
                            </div>
                            <div className="flex gap-2">
                                <label className="text-sm">End:</label>
                                <input type="date" value={rangeEnd} onChange={(e)=>setRangeEnd(e.target.value)} required className="border p-1 rounded" />
                            </div>
                        </div>
                    )}

                    <div className="flex gap-2 justify-end">
                        <button type="button" onClick={() => onClose && onClose()} className="px-4 py-2 rounded border">
                            Cancel
                        </button>
                        <button type="submit" className="bg-zinc-800 text-white px-4 py-2 rounded">
                            Save Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EventForm;