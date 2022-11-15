import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import "./HostManagementPage.css";
import 'react-css-dropdown/dist/index.css'
import { getinfo, eventdel, eventdeladmin, geteventbyid, 
  updatedescription, updatedescriptionadmin, 
  updatelocation, updatelocationadmin, updatetime, updateInviteOnly,
  updatetimeadmin, updatetitle, updatetitleadmin, updateEmailadmin} from '../helpers/connector'
import "./EventEditingPage.css"

class EventEditingPage extends Component<any,any> {
  constructor(props:any){
      super(props);
      this.state = {id: this.props.eventNum(), arr:[], currarr:['','','','',''], role: "STUDENT", updateForced: false, ForceUpdateNow: false, checked:false};
      this.forceup = this.forceup.bind(this);
      this.eventdel = this.eventdel.bind(this);
      this.updateTitle = this.updateTitle.bind(this);
      this.updateDescription = this.updateDescription.bind(this);
      this.updateEmail = this.updateEmail.bind(this);
      this.updateLocation = this.updateLocation.bind(this);
      this.updateTime = this.updateTime.bind(this);
      this.updateInviteOnly = this.updateInviteOnly.bind(this);
  }

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
    if(this.state.ForceUpdateNow){
      geteventbyid(this.state.id).then((content)=>{
        let array = [];
        array = [content.data.title, content.data.email, content.data.time, 
          content.data.location, content.data.description, content.data.inviteOnly];
        this.setState({arr:array, ForceUpdateNow:false});
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
    let tmp = this.state.currarr[0];
    let conf = window.confirm('Confirm or deny title: \n' + tmp);
    if(conf && tmp != null){
      if(this.state.role === "ADMIN"){
          updatetitleadmin(this.state.id, tmp).then(()=>{
              alert("Admin successful update");
              this.forceup();
          }).catch(()=>alert("Admin unsuc update"));
      }else{
          updatetitle(this.state.id, tmp).then(()=>{
              alert("successful update");
              this.forceup();
          }).catch(()=>alert("unsuc update"));
      }
    }
  }
  updateEmail(){
    let tmp = this.state.currarr[1];
    let conf = window.confirm('Confirm or deny Email: \n' + tmp);
    if(conf && tmp != null){
      if(this.state.role === "ADMIN"){
          updateEmailadmin(this.state.id, tmp).then(()=>{
              alert("successful update");
              this.forceup();
          }).catch(()=>alert("unsuc update"));
      }else{
          alert("only admin can change email");
      }
    }
  }

  updateTime(){
    let tmp = this.state.currarr[2];
    let conf = window.confirm('Confirm or deny Time: \n' + tmp);
    if(conf && tmp != null){
      if(this.state.role === "ADMIN"){
          updatetimeadmin(this.state.id, tmp).then(()=>{
              alert("successful update");
              this.forceup();
          }).catch(()=>alert("unsuc update"));
      }else{
          updatetime(this.state.id, tmp).then(()=>{
              alert("successful update");
              this.forceup();
          }).catch(()=>alert("unsuc update"));
      }
    }
  }

  updateLocation(){
    let tmp = this.state.currarr[3];
    let conf = window.confirm('Confirm or deny location: \n' + tmp);
    if(conf && tmp != null){
      if(this.state.role === "ADMIN"){
          updatelocationadmin(this.state.id, tmp).then(()=>{
              alert("successful update");
              this.forceup();
          }).catch(()=>alert("unsuc update"));
      }else{
          updatelocation(this.state.id, tmp).then(()=>{
              alert("successful update");
              this.forceup();
          }).catch(()=>alert("unsuc update"));
      }
    }
  }

  updateDescription(){
    let tmp = this.state.currarr[4];
    let conf = window.confirm('Confirm or deny Description: \n' + tmp);
    if(conf && tmp != null){
        if(this.state.role === "ADMIN"){
            updatedescriptionadmin(this.state.id, tmp).then(()=>{
                alert("successful update");
                this.forceup();
            }).catch(()=>alert("unsuc update"));
        }else{
            updatedescription(this.state.id, tmp).then(()=>{
                alert("successful update");
                this.forceup();
            }).catch(()=>alert("unsuc update"));
        }
      }
  }

  updateInviteOnly(){
    let tmp = this.state.checked;
    let conf = window.confirm('Confirm or deny Invite-Only: \n' + (tmp?"TRUE":"FALSE"));
    if(conf){
      updateInviteOnly(this.state.id, (tmp?"TRUE":"FALSE")).then(()=>{
            alert("successful update");
            this.forceup();
        }).catch(()=>alert("unsuc update"));
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
              <button className="eventEditPageButton" type="submit" onClick={this.updateTitle}>Update</button> 
              <label className='textCss'>Event title : </label> <input type="text" id="event_title" onChange={evt => {this.state.currarr[0] = evt.target.value }} placeholder={this.state.arr[0]}/>
            </div>

            <div className='buttonAndText'>
              <button className="eventEditPageButton" type="submit" onClick={this.updateEmail}>Update</button> 
              <label className='textCss'>Event host : </label> <input type="text" id="event_title" onChange={evt => {this.state.currarr[1] = evt.target.value }} placeholder={this.state.arr[1]}/>
            </div>

            <div className='buttonAndText'>
              <button className="eventEditPageButton" type="submit" onClick={this.updateTime}>Update</button> 
              <label className='textCss'>Event date : </label> <input type="text" id="event_title" onChange={evt => {this.state.currarr[2] = evt.target.value }} placeholder={this.state.arr[2]}/>
            </div>

            <div className='buttonAndText'>
              <button className="eventEditPageButton" type="submit" onClick={this.updateLocation}>Update</button> 
              <label className='textCss'>Event location : </label> <input type="text" id="event_title" onChange={evt => {this.state.currarr[3] = evt.target.value }} placeholder={this.state.arr[3]}/>
            </div>

            <div className='buttonAndText'>
              <button className="eventEditPageButton" type="submit" onClick={this.updateDescription}>Update</button> 
              <label className='textCss'>Event description : </label> <input type="text" id="event_title" onChange={evt => {this.state.currarr[4] = evt.target.value }} placeholder={this.state.arr[4]}/>
            </div>

            <div className='buttonAndText'>
              <button className="eventEditPageButton" type="submit" onClick={this.updateInviteOnly}>Update</button> 
              <label className='textCss'>Invite Only : </label> <input type="checkbox" id="event_title" onChange={evt => {this.setState({checked: evt.target.checked}) }}/>
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