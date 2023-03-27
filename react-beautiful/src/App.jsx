import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Index01 from './pages/index01'
import Index02 from './pages/index02'
import Index03 from './pages/index03'
import Index04 from './pages/index04'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index01 />}></Route>
        <Route path="/02" element={<Index02 />}></Route>
        <Route path="/03" element={<Index03 />}></Route>
        <Route path="/04" element={<Index04 />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
