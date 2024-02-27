import SelectExam from "./components/SelectExam";
import LabExam from "./components/LabExam";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    // test Router 변경 예정
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<SelectExam />} />
          <Route path="/lab" element={<LabExam />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
