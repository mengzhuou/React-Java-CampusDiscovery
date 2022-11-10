import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import First from "./components/SignUpPage";
import Second from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Main from "./components/Main";
import EventEditingPage from "./components/EventEditingPage";
import EventCreationPage from "./components/EventCreationPage";
import EventDescriptionPage from "./components/EventDescriptionPage";
import AttendeeListPage from "./components/AttendeeListPage";
import HostManagementPage from "./components/HostManagementPage";
import HostManagementPagetmp from "./components/HostManagementPagetmp";
import RsvpPage from "./components/RsvpPage";
import React from "react";
import internal from "stream";


class App extends React.Component<any,any>{
  constructor(props:any){
    super(props);
    this.state = {EventID: -1};
    this.state = {EventPage: -1};
    this.getEventID = this.getEventID.bind(this);
    this.setEventID = this.setEventID.bind(this);
    this.getEventPage = this.getEventPage.bind(this);
    this.setEventPage = this.setEventPage.bind(this);
  }
  setEventPage(page:number){
    this.setState({EventPage: page});
  }
  getEventPage(){
    return this.state.EventPage;
  }

  setEventID(id:number){
    this.setState({EventID: id});
  }
  getEventID(){
    return this.state.EventID;
  }
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/first" element={<First />}/>
          <Route path="/dashboard" element={<Dashboard setEventID={this.setEventID} setEventPage={this.setEventPage}/>}/>
          <Route path="/second" element={<Second />}/>
          <Route path="/" element={<Main/>}/>
          <Route path="/EventEditingPage" element={<EventEditingPage eventNum={this.getEventID} eventPage={this.getEventPage}/>}/>
          <Route path="/EventCreationPage" element={<EventCreationPage/>}/>
          <Route path="/AttendeeListPage" element={<AttendeeListPage/>}/>
          <Route path="/HostManagementPage" element={<HostManagementPage/>}/>
          <Route path="/HostManagementPagetmp" element={<HostManagementPagetmp/>}/>
          <Route path="/RsvpPage" element={<RsvpPage/>}/>
          <Route path="/EventDescriptionPage" element={<EventDescriptionPage eventNum={this.getEventID} eventPage={this.getEventPage}/>}/>
        </Routes>
      </Router>
    );
  }
}
  
export default App;

