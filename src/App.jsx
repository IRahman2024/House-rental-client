import { Outlet } from 'react-router-dom'
import './App.css'
// import Banner from './components/Banner/Banner'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'

function App() {

  return (
    <div>
      <div className='top-0 sticky z-50'>
        <Navbar></Navbar>
      </div>

    <div className='min-h-screen'>
      <Outlet></Outlet>
    </div>

      <Footer></Footer>
    </div>
  )
}

export default App
