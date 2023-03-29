import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Index from './pages/index'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}></Route>
        {/* <Route path="/02" element={<Index02 />}></Route>
        <Route path="/03" element={<Index03 />}></Route>
        <Route path="/04" element={<Index04 />}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
