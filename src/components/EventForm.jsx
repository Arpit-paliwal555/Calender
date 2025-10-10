import { useState } from 'react';

const EventForm = ({ modalRef, selectedDate, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const event = {
            title: title.trim(),
            time,
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
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        type="time"
                        className="border p-2 rounded"
                        required
                    />
                    <div className="flex gap-2 justify-end">
                        <button type="button" onClick={() => onClose && onClose()} className="px-4 py-2 rounded border">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Save Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EventForm;