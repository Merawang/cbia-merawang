// Components
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <div className="w-screen container mx-auto">
        <Navbar />
        <div className="main-section px-6 pt-24">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
