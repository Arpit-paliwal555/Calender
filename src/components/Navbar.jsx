import CalendarIcon from '../assets/calendar-svgrepo-com.svg';
import { Link } from 'react-router-dom';

const Navbar = ()=>{
    return(
        <>
            <header className='w-screen bg-blue-400 sm:px-6 md:px-8 lg:px-12'>
                <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between'>
                    <div className="h-28 sm:h-24 md:h-22 lg:h-16 flex items-center">
                        <img src={CalendarIcon} className='h-8 w-8 mr-2' alt="" />
                        <div className='text-white font-semibold text-lg font-sans' >My Calendar</div>
                    </div>
                    <div className='hidden md:flex items-center space-x-4'>
                        <a href="" className='text-blue-100 hover:text-white'>Home</a>                       
                        <Link to="/events" className="text-blue-100 hover:text-white">
                            Events
                        </Link>
                        <a href="" className='text-blue-100 hover:text-white'>About</a>
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