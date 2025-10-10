import CalendarIcon from '../assets/calendar-svgrepo-com.svg';
import { Link } from 'react-router-dom';

const Navbar = ()=>{
    return(
        <>
            <header className='w-screen bg-zinc-800 sm:px-6 md:px-8 lg:px-12'>
                <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between'>
                    <div className="h-28 sm:h-24 md:h-22 lg:h-16 flex items-center">
                        <img src={CalendarIcon} className='h-8 w-8 mr-2' alt="" />
                        <div className='text-white font-semibold text-lg font-sans' >My Calendar</div>
                    </div>
                    <div className='hidden md:flex items-center space-x-4'>
                        <Link to="/" className='text-zinc-100 hover:text-zinc-300'>
                            Home
                        </Link>                       
                        <Link to="/events" className="text-zinc-100 hover:text-zinc-300">
                            Events
                        </Link>
                        <a href="" className='text-zinc-100 hover:text-zinc-300'>About</a>
                    </div>
                    <div className="md:hidden">
                      <button className="text-blue-100">Menu</button>
                    </div>
                </nav>
            </header>    
        </>
    )
}
export default Navbar;