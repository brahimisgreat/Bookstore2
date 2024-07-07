import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Books } from "./Pages/Books";
import { Add } from "./Pages/Add";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books/>} />
          <Route path="/" element={<Add/>} />
          <Route path="/" element={<Books/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
