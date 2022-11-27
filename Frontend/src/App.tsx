import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import First from "./components/SignUp/SignUpPage";
import Second from "./components/Login/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Main from "./components/Main/Main";
import EventEditingPage from "./components/EventEditing/EventEditingPage";
import EventCreationPage from "./components/EventCreation/EventCreationPage";
import EventDescriptionPage from "./components/EventDescription/EventDescriptionPage";
import AttendeeListPage from "./components/Attendee/AttendeeListPage";
import HostManagementPage from "./components/EventEditing/HostManagementPage";
import RsvpPage from "./components/Rsvp/RsvpPage";
import AttendeeBox from "./components/Attendee/AttendeeBox";
import AttendeeBoxForHostManagement from "./components/Attendee/AttendeeBoxForHostManagement";
import YourEvent from "./components/YourEvent/YourEvent";
import Map from "./components/EventMap/Map";
import React from "react";

//google-map API key: AIzaSyCqcmw27n2Z66yVih4M47FZGLj2vKcJnkA
//Website: UniversityCanvasProject.com

class App extends React.Component<any,any>{
  constructor(props:any){
    super(props);
    this.state = {EventID: -1};
    this.getEventID = this.getEventID.bind(this);
    this.setEventID = this.setEventID.bind(this);
    this.getAttendeeID = this.getAttendeeID.bind(this);
    this.setAttendeeID = this.setAttendeeID.bind(this);

  }
  setEventID(id:number){
    this.setState({EventID: id});
  }
  getEventID(){
    return this.state.EventID;
  }

  setAttendeeID(id:number){
    this.setState({EventID: id});
  }
  getAttendeeID(){
    return this.state.EventID;
  }
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/first" element={<First />}/>
          <Route path="/dashboard" element={<Dashboard setEventID={this.setEventID}/>}/>
          <Route path="/second" element={<Second />}/>
          <Route path="/" element={<Main/>}/>
          <Route path="/EventCreationPage" element={<EventCreationPage/>}/>
          <Route path="/EventDescriptionPage" element={<EventDescriptionPage eventNum={this.getEventID}/>}/>
          <Route path="/EventEditingPage" element={<EventEditingPage eventNum={this.getEventID}/>}/>
          <Route path="/AttendeeListPage" element={<AttendeeListPage eventNum={this.getEventID}/>}/>
          <Route path="/AttendeeBox" element={<AttendeeBox eventNum={this.getEventID}/>}/>
          <Route path="/AttendeeBox" element={<AttendeeBoxForHostManagement eventNum={this.getEventID}/>}/>
          <Route path="/HostManagementPage" element={<HostManagementPage eventNum={this.getEventID}/>}/>
          <Route path="/RsvpPage" element={<RsvpPage eventNum={this.getEventID}/>}/>
          <Route path="/yourEvent" element={<YourEvent setEventID={this.setEventID}/>}/>
          <Route path="/map" element={<Map />}/>
        </Routes>
      </Router>
    );
  }
}
  
export default App;

