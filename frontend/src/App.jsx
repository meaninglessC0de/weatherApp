import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CityList from './components/CityList'
import CityDetail from './components/CityList'

function App() {
  const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CityList />} />
        <Route path="/city/:code" element={<CityDetail/>} />
        <Route path="/city/:code/map" element={<Map/>} />
        <Route path="/login" element={<Map/>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App