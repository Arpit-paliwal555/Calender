import CalendarIcon from '../assets/calendar-svgrepo-com.svg';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { supabase } from '../SupabaseClient.js';
import { useNavigate } from 'react-router-dom';

const Navbar = ({user, onSignOut})=>{
    const [isOpen, setIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [fullName, setFullName] = useState('Guest');
    const navigate = useNavigate();

    const signOutHandler = async () => {
        try {
            await onSignOut();
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }

    const tempName = async()=>{
        // Fetch full name from Supabase
        if(user){
        const { data, error } = await supabase
            .from('UserNames')
            .select('full_name')
            .eq('id', user.id);

        if (error) {
            console.error('Error fetching user data:', error);
        } else if (data && data.length > 0) {
            return data?.[0]?.full_name ?? 'Guest';
        } else {
            console.warn('No user metadata found for this ID.');
        }
        }
    }
    useEffect(() => {  
        const fetchName = async () => {
            const name = await tempName();
            setFullName(name);
        };
        fetchName();
    }, [user]);

    const onMenuClick = () => setMenuOpen(!menuOpen);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);
    return(
        <>
            <header className='w-full bg-zinc-800 sm:px-6 md:px-8 lg:px-12'>
                <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between'>
                    <div className="h-28 sm:h-24 md:h-22 lg:h-16 flex items-center">
                        <Link to="/home" className='flex flex-row'>
                        <img src={CalendarIcon} className='h-8 w-8 mr-2' alt="" />
                        <div className='text-white font-semibold text-lg font-sans' >My Calendar</div>
                        </Link>
                    </div>
                    <div className='hidden md:flex items-center space-x-4'>
                        <Link to="/home" className='text-zinc-100 hover:text-zinc-300'>
                            Home
                        </Link>                       
                        <Link to="/events" className="text-zinc-100 hover:text-zinc-300">
                            Events
                        </Link>
                        <button className='text-zinc-100 hover:text-zinc-300' onClick={onOpen}>About</button>                        
                        {user ? (
                                <div className='text-white flex items-center space-x-4'>
                                <span>Welcome, {fullName}</span>
                                <button onClick={signOutHandler} className='bg-emerald-500 p-2 text-sm rounded-md'>Sign Out</button>
                                </div>
                            ) : (
                                <span className='text-white'>Not logged in</span>
                            )}
                    </div>
                    <div className="md:hidden">
                      <button className="text-blue-100" onClick={onMenuClick}>Menu</button>
                      {menuOpen && (
                            <div className="mt-2 flex flex-col space-y-2">
                            <Link to="/" className="text-zinc-100 hover:text-zinc-300">
                                Home
                            </Link>
                            <Link to="/events" className="text-zinc-100 hover:text-zinc-300">
                                Events
                            </Link>
                            <button
                                className="text-zinc-100 hover:text-zinc-300"
                                onClick={onOpen}
                            >
                                About
                            </button>
                            </div>
                        )}
                    </div>
                </nav>
            </header> 
            <>
            {/* Backdrop */}
            {isOpen && (
                <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-4 border-b font-bold text-lg flex justify-between items-center">
                About
                <button onClick={onClose} className="text-gray-500 hover:text-black">
                    ✕
                </button>
                </div>
                <ul className="p-4 space-y-4">
                <li><a href="#" className="text-blue"> Contact Us</a></li>
                <li><a href="#" className="text-blue">Terms & Conditions</a></li>
                </ul>
            </div>
            </>   
        </>
    )
}
export default Navbar;