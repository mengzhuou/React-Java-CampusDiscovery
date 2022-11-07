import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate }
    from "react-router-dom";
import First from "./components/SignUpPage";
import Second from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Main from "./components/Main";
import EventEditingPage from "./components/EventEditingPage";
import EventCreationPage from "./components/EventCreationPage";
import EventDescriptionPage from "./components/EventDescriptionPage";
import AttendeeListPage from "./components/AttendeeListPage";
import HostManagementPage from "./components/HostManagementPage";
import RsvpPage from "./components/RsvpPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/first" element={<First />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/second" element={<Second />}/>
        <Route path="/" element={<Main/>}/>
        <Route path="/EventEditingPage" element={<EventEditingPage/>}/>
        <Route path="/EventCreationPage" element={<EventCreationPage/>}/>
        <Route path="/AttendeeListPage" element={<AttendeeListPage/>}/>
        <Route path="/HostManagementPage" element={<HostManagementPage/>}/>
        <Route path="/RsvpPage" element={<RsvpPage/>}/>
        <Route path="/EventDescriptionPage" element={<EventDescriptionPage/>}/>
      </Routes>
    </Router>
  );
}
  
export default App;

