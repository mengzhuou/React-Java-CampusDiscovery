import { Link } from 'react-router-dom';
import "./EventDescriptionPage.css";
import "../Dashboard/Dashboard.css";
import { withRouter } from "../withRouter";
import { Component } from 'react';
import { geteventbyid, getRsvpStatus, getCount } from '../../helpers/connector';
  
class EventDescriptionPage extends Component<any,any> {
  constructor(props:any){
    super(props);
    this.state = {id: this.props.eventNum(), currentCapacity:0, arr: [], updateForced:false, ForceUpdateNow:false, status:"NORSVP"};
    this.forceup = this.forceup.bind(this);
  }
  
  forceup() {
    this.setState({ForceUpdateNow: true});
  }

  async updateNow(){
    let array: any[] = [];
    let stat: any = this.state.status;
    let curr: number = this.state.currentCapacity;
    await geteventbyid(this.state.id).then((content)=>{
        array = [content.data.title, content.data.email, content.data.time, 
            content.data.location, content.data.description, content.data.capacity, content.data.inviteOnly];
    })
    await getRsvpStatus(this.state.id).then((content)=>{
      stat = content.data;
    }).catch(()=>console.log("Failed to get Status"));

    await getCount(this.state.id).then((content)=>{
      curr = content.data;
    })
    
    this.setState({currentCapacity: curr, arr: array, ForceUpdateNow:false, status:stat});
  }
  
  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
    if(this.state.ForceUpdateNow){
      this.updateNow();
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
          <div className='test'>
            Capacity : <br/>{this.state.currentCapacity}/{this.state.arr[5]}
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
            <label htmlFor ='Invite-Only'>Invite-Only : {this.state.arr[6]?"True":"False"}</label>
          </div>

          <div className="desName">
            <p>Your RSVP Status : {this.state.status}</p>
          </div>

          {/* <div className="desName">
            <label htmlFor ='Capacity'>Total Capacity : {this.state.arr[5]}</label>
          </div>

          <div className="desName">
            <label htmlFor ='Capacity'>Current Capacity : {this.state.currentCapacity}</label>
          </div> */}

          
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
            <Link to = "/yourEvent">
              <button className="ManageButton">Your Events</button>
            </Link>
        </div>
      </div>
    );
  }
}
export default withRouter(EventDescriptionPage);