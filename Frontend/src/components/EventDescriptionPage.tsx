import { Link } from 'react-router-dom';
import "./EventDescriptionPage.css";
import "./Dashboard.css";
import Modal from "./Modal";
import { Component } from 'react';
import { geteventbyid, getRsvpStatus } from '../helpers/connector';
  
class EventDescriptionPage extends Component<any,any> {
  constructor(props:any){
    super(props);
    this.state = {id: this.props.eventNum(), arr: [], updateForced:false, ForceUpdateNow:false, status:"NORSVP"};
    this.forceup = this.forceup.bind(this);
  }

  forceup() {
    this.setState({ForceUpdateNow: true});
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
        getRsvpStatus(this.state.id).then((content)=>{
          this.setState({status:content.data})
        }).catch(()=>console.log("Failed to get Status"));
        

        this.setState({ForceUpdateNow:false});
    }
  }

  componentDidMount(): void {
    this.setState({ForceUpdateNow:true});
  }

  // showEventStatus() {
  //   getRsvp().then((content)=>{

  //   })
  // }
  render(){
    return (
      <div className = "App">
        <header className="App-header">
          <p>Event Description</p>
        </header>
        <div className='eventBody'>
          <div className="desName">
            <label htmlFor='title'>Event title : {this.state.arr[0]}</label>
          </div>

          <div className="desName">
            <label htmlFor ='host'>Event host : {this.state.arr[1]}</label>
          </div>

          <div className="desName">
            <label htmlFor ='date'>Event date : {this.state.arr[2]}</label>
          </div>

          <div className="desName">
            <label htmlFor ='location'>Event location : {this.state.arr[3]}</label>
          </div>

          <div className="desName">
            <label htmlFor ='description'>Event description : {this.state.arr[4]}</label>
          </div>

          <div className="desName">
            <p>Your RSVP Status : {this.state.status}</p>
          </div>
          <Link to = "/RsvpPage">
              <button className='button'> RSVP : </button>
          </Link>
          
        </div>
        <div className='bottomnav'>
            <Link to = "/AttendeeListPage">
              <button className="buttomnavButton">Attendee List</button>
            </Link>
            <Link to = "/Dashboard">
              <button className="buttomnavButton">Dashboard</button>
            </Link>
            <Link to = "/RsvpPage">
              <button className="buttomnavButton">RsvpPage</button>
            </Link>
            <Link to = "/HostManagementPage">
              <button className="ManageButton">Host Management</button>
            </Link>
        </div>
      </div>
    );
  }
}

export default EventDescriptionPage;