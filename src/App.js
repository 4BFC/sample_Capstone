import SelectExam from "./components/SelectExam";
import LabExam from "./components/LabExam";
import Test from "./test/html_parse_img/test"
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    // test Router 변경 예정
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<SelectExam />} />
          <Route path="/lab" element={<LabExam />} />
          <Route path="/html_parse" element={<Test />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
