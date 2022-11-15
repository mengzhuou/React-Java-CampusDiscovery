import { Link } from 'react-router-dom';
import "./EventDescriptionPage.css";
import "./Dashboard.css";
import Modal from "./Modal";
import { withRouter } from "./withRouter";
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
                content.data.location, content.data.description, content.data.capacity, content.data.inviteOnly];
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
    
    rsvpNav = ()=>{
      this.props.navigate("/RsvpPage")
    }
  render(){
    return (
      <div className = "App">
        <header>
          <p className='descriptionPageTitle'>Event Description</p>
        </header>
        <div className='eventBody'>
          <label className="desName" htmlFor='title'>Event title : {this.state.arr[0]}</label>
          <button className='DescriptionPageRsvpButton' onClick={this.rsvpNav}> RSVP </button>

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
            <label htmlFor ='Capacity'>Capacity : {this.state.arr[5]}</label>
          </div>

          <div className="desName">
            <label htmlFor ='Invite-Only'>Invite-Only : {this.state.arr[6]?"True":"False"}</label>
          </div>

          <div className="desName">
            <p>Your RSVP Status : {this.state.status}</p>
          </div>
          
        </div>
        <div className='bottomnav'>
            <Link to = "/AttendeeListPage">
              <button className="buttomnavButton">Attendee List</button>
            </Link>
            <Link to = "/Dashboard">
              <button className="buttomnavButton">Dashboard</button>
            </Link>
            <Link to = "/HostManagementPage">
              <button className="ManageButton">Host Management</button>
            </Link>
        </div>
      </div>
    );
  }
}
export default withRouter(EventDescriptionPage);