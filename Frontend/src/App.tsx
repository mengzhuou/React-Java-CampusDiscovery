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
import InitMap from "./components/EventMap/InitMap";
import React from "react";

//google-map API key (API key 1): AIzaSyCqcmw27n2Z66yVih4M47FZGLj2vKcJnkA
//google-autocomplete API key (API key 2): AIzaSyDhRRpoUjKUIgn9jqI6prKRaQKHJ9e6bQ0
//Website: http://localhost:3000/InitMap

class App extends React.Component<any,any>{
  constructor(props:any){
    super(props);
    this.state = {EventID: -1, arr:[]};
    this.getEventID = this.getEventID.bind(this);
    this.setEventID = this.setEventID.bind(this);
    this.setarr = this.setarr.bind(this);
    this.getarr = this.getarr.bind(this);

  }
  setEventID(id:number){
    this.setState({EventID: id});
  }
  getEventID(){
    return this.state.EventID;
  }

  setarr(arr:any[]){
    let tmp:any[] = [];
    for(let i in arr){
      tmp.push(arr[i]);
    }
    this.setState({arr:tmp});
  }
  getarr(){
    return this.state.arr;
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/first" element={<First />}/>
          <Route path="/dashboard" element={<Dashboard setEventID={this.setEventID} setarr={this.setarr}/>}/>
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
          <Route path="/InitMap" element={<InitMap getarr={this.getarr} setEventID={this.setEventID}/>}/>
        </Routes>
      </Router>
    );
  }
}
  
export default App;

