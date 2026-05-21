import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./views/Home"
import History from "./views/History"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App