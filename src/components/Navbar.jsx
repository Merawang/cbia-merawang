import TimelineIcon from '@mui/icons-material/Timeline';
import { NavLink } from 'react-router-dom';


const Navbar = ({ children }) => {
    return (<>
        <div className="w-full h-fit block fixed top-0 left-0 right-0 bg-white z-50">
            <div className="wrapper flex flex-row justify-between items-center shadow px-6 py-2">
                <div className='basis-1/4'>{children}</div>
                <NavLink to={'/'}>
                    <div className='flex flex-row justify-center items-center gap-2 basis-3'>
                        <img src="logoKKNpng.png" alt="Logo KKN Seterang Merawang" width={50} />
                        <h1 className="md:text-xl font-bold text-gray-800">Obat - <span className='text-blue-600'>SeterangMerawang</span></h1>
                    </div>
                </NavLink>
                <div className='basis-1/4'></div>
            </div>
        </div>
    </>);
}

export default Navbar;