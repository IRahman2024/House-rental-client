import { Outlet } from 'react-router-dom'
import './App.css'
// import Banner from './components/Banner/Banner'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'

function App() {

  return (
    <div>
      <Navbar></Navbar>

      <Outlet></Outlet>

      <Footer></Footer>
    </div>
  )
}

export default App
