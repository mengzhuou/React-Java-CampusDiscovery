import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import "./HostManagementPage.css";
import 'react-css-dropdown/dist/index.css'
import { getinfo, eventdel, eventdeladmin, geteventbyid, 
  updatedescription, updatedescriptionadmin, 
  updatelocation, updatelocationadmin, updatetime, 
  updatetimeadmin, updatetitle, updatetitleadmin, updateEmailadmin} from '../helpers/connector'
import "./EventEditingPage.css"

class EventEditingPage extends Component<any,any> {
  constructor(props:any){
      super(props);
      this.state = {id: this.props.eventNum(), arr:[], role: "STUDENT", updateForced: false, ForceUpdateNow: false};
      this.forceup = this.forceup.bind(this);
      this.eventdel = this.eventdel.bind(this);
      this.updateTitle = this.updateTitle.bind(this);
      this.updateDescription = this.updateDescription.bind(this);
      this.updateEmail = this.updateEmail.bind(this);
      this.updateLocation = this.updateLocation.bind(this);
      this.updateTime = this.updateTime.bind(this);
  }

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
    if(this.state.ForceUpdateNow){
      geteventbyid(this.state.id).then((content)=>{
        let array = [];
        array = [content.data.title, content.data.email, content.data.time, 
          content.data.location, content.data.description, content.data.id];
        this.setState({arr:array});
        this.forceUpdate();
      })
      this.setState({ForceUpdateNow:false});
    }
  }
    
  componentDidMount(): void {
    this.setState({ForceUpdateNow: true});
  }
      
  async forceup() {
      this.setState({ForceUpdateNow:true});
  }
  eventdel(){
    let conf = window.confirm('Confirm or deny');
    if(conf){
      if(this.state.role === "ADMIN"){
          eventdeladmin(this.state.id).then(()=>{
              alert("Admin successful update");
              this.props.navigate("/Dashboard")
          }).catch(()=>alert("Admin unsuc update"));
      }else{
          eventdel(this.state.id).then(()=>{
              alert("successful update");
              this.props.navigate("/Dashboard")
          }).catch(()=>alert("unsuc update"));
      }
    }
  }

  updateTitle(){
    let tmp = prompt('Update Title:');
    let conf = window.confirm('Confirm or deny');
    if(conf && tmp != null){
      if(this.state.role === "ADMIN"){
          updatetitleadmin(this.state.id, tmp).then(()=>{
              alert("Admin successful update");
              this.props.update();
          }).catch(()=>alert("Admin unsuc update"));
      }else{
          updatetitle(this.state.id, tmp).then(()=>{
              alert("successful update");
              this.props.update();
          }).catch(()=>alert("unsuc update"));
      }
      console.log(this.state.id, tmp)
    }
  }
  updateDescription(){
      let tmp = prompt('Update Description:');
      let conf = window.confirm('Confirm or deny');
      if(conf && tmp != null){
          if(this.state.role === "ADMIN"){
              updatedescriptionadmin(this.state.id, tmp).then(()=>{
                  alert("successful update");
                  this.props.update();
              }).catch(()=>alert("unsuc update"));
          }else{
              updatedescription(this.state.id, tmp).then(()=>{
                  alert("successful update");
                  this.props.update();
              }).catch(()=>alert("unsuc update"));
          }
          console.log(this.state.id, tmp)
      }
  }
  updateEmail(){
      let tmp = prompt('Update Host:');
      let conf = window.confirm('Confirm or deny');
      if(conf && tmp != null){
          if(this.state.role === "ADMIN"){
              updateEmailadmin(this.state.id, tmp).then(()=>{
                  alert("successful update");
                  this.props.update();
              }).catch(()=>alert("unsuc update"));
          }else{
              alert("only admin can change email");
          }
          console.log(this.state.id, tmp)
      }
  }
  updateLocation(){
      let tmp = prompt('Update Location:');
      let conf = window.confirm('Confirm or deny');
      if(conf && tmp != null){
          if(this.state.role === "ADMIN"){
              updatelocationadmin(this.state.id, tmp).then(()=>{
                  alert("successful update");
                  this.props.update();
              }).catch(()=>alert("unsuc update"));
          }else{
              updatelocation(this.state.id, tmp).then(()=>{
                  alert("successful update");
                  this.props.update();
              }).catch(()=>alert("unsuc update"));
          }
          console.log(this.state.id, tmp)
      }
  }
  updateTime(){
      let tmp = prompt('Update Date:');
      let conf = window.confirm('Confirm or deny');
      if(conf && tmp != null){
          if(this.state.role === "ADMIN"){
              updatetimeadmin(this.state.id, tmp).then(()=>{
                  alert("successful update");
                  this.props.update();
              }).catch(()=>alert("unsuc update"));
          }else{
              updatetime(this.state.id, tmp).then(()=>{
                  alert("successful update");
                  this.props.update();
              }).catch(()=>alert("unsuc update"));
          }
          console.log(this.state.id, tmp)
      }
  }

  render(){
      return (
        <div className = "App">
          <header className="App-header">
            <p>Edit Your Event</p>
          </header>
          <body className='eventEditingConatiner'>
            <div className='buttonAndText'>
              <button className="eventEditPageButton" type="submit" onClick={this.updateTitle}>Edit</button> 
              <label className='textCss'>Event title : {this.state.arr[0]}</label>
            </div>

            <div className='buttonAndText'>
              <button className="eventEditPageButton" type="submit" onClick={this.updateEmail}>Edit</button> 
              <label className='textCss'>Event host : {this.state.arr[1]}</label>
            </div>

            <div className='buttonAndText'>
              <button className="eventEditPageButton" type="submit" onClick={this.updateTime}>Edit</button> 
              <label className='textCss'>Event date : {this.state.arr[2]}</label>
            </div>

            <div className='buttonAndText'>
              <button className="eventEditPageButton" type="submit" onClick={this.updateLocation}>Edit</button> 
              <label className='textCss'>Event location : {this.state.arr[3]}</label>
            </div>

            <div className='buttonAndText'>
              <button className="eventEditPageButton" type="submit" onClick={this.updateDescription}>Edit</button> 
              <label className='textCss'>Event description : {this.state.arr[4]}</label>
            </div>

            <button className="editPageDeleteButton" onClick={this.eventdel}>Delete This Event</button>

          </body>
            <div className='bottomnav'>
              <Link to = "/HostManagementPage">
                <button className="buttomnavButton">Host Management</button>
              </Link>
              <Link to = "/Dashboard">
                  <button className="buttomnavButton">Dashboard</button>
              </Link>
            </div>
        </div>
      );
  }
}

export default EventEditingPage;