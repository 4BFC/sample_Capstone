import SelectExam from "./components/SelectExam";
import LabExam from "./components/LabExam";
// import MD_test from "./test/markdown/Markdown_test"
// import MD_css from "./test/markdown/MD_css"
import Test from "./test/markdown/test"
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    // test Router 변경 예정
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<SelectExam />} />
          <Route path="/lab" element={<LabExam />} />
          {/* <Route path="/MD_test" element={<MD_test />} /> */}
          <Route path="/test" element={<Test />} />
          {/* <Route path="/MD_css" element={<MD_css />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
