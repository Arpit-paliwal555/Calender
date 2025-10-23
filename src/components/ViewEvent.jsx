export const ViewEvent = ({ event, onClose }) => {
    if (!event) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96 h-96">
                <button
                    aria-label="Close modal"
                    onClick={() => onClose && onClose()}
                    className="ml-80 top-5 text-gray-500 hover:text-gray-800"
                >
                    ✕ 
                </button>
                <h2 className="text-lg font-semibold mb-4">{event.title}</h2>
                <p className="mb-2"><strong>Description:</strong> {event.description}</p>
                <p className="mb-2"><strong>Date:</strong> {event.date}</p>
                <p className="mb-2"><strong>Time:</strong> {event.time}</p>
                <p className="mb-2"><strong>Category:</strong> {event.category}</p>
                <p className="mb-2"><strong>Created by:</strong> {event.username}</p>
            </div>
        </div>
    );
} 
