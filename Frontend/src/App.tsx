import "./App.css";
import { BrowserRouter as Router, Routes, Route }
    from "react-router-dom";
import First from "./components/SignUpPage";
import Second from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Main from "./components/Main";
import EventEditingPage from "./components/EventEditingPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/first" element={<First />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/second" element={<Second />}/>
        <Route path="/" element={<Main/>}/>
        <Route path="/eventEditing" element={<EventEditingPage/>}/>
      </Routes>
    </Router>
  );
}
  
export default App;

