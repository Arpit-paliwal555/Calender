import React from 'react';

const EventForm = ({ modalRef, selectedDate }) => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Add Event for {selectedDate ?? 'selected date'}</h2>
                <form className="flex flex-col gap-3">
                    <input type="text" placeholder="Event Title" className="border p-2 rounded" />
                    <input type="time" className="border p-2 rounded" />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Save Event
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EventForm;