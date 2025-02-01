import Navbar from './components/Navbar'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import UploadFile from './pages/UploadFile'
import Results from './pages/Results'
import Home from './pages/Home'
import bgImage from './assets/bg.png'
function App() {

  return (
    <div className="bg-stone-900 h-lvh bg-cover bg-center bg-no-repeat"
         style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="relative z-10">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadFile />} />
        <Route path="/results" element={<Results />} />
      </Routes>
      
    </div>
    

  )
}

export default App
