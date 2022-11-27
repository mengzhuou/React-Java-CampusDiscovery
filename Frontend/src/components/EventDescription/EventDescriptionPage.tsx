import { Link } from 'react-router-dom';
import "./EventDescriptionPage.css";
import "../Dashboard/Dashboard.css";
import { withRouter } from "../withRouter";
import { Component } from 'react';
import { geteventbyid, getRsvpStatus, getCount, getinfo } from '../../helpers/connector';
import { type } from 'os';
  
class EventDescriptionPage extends Component<any,any> {
  constructor(props:any){
    super(props);
    this.state = {id: this.props.eventNum(), currentCapacity:0, arr: [], updateForced:false, 
      ForceUpdateNow:false, status:"NORSVP", username: ""};
    this.forceup = this.forceup.bind(this);
  }
  
  forceup() {
    this.setState({ForceUpdateNow: true});
  }

  async updateNow(){
    let array: any[] = [];
    let status: any = this.state.status;
    let curr: number = this.state.currentCapacity;
    let username: string = this.state.username;
    await geteventbyid(this.state.id).then((content)=>{
        array = [content.data.title, content.data.email, content.data.time, 
            content.data.location, content.data.description, content.data.capacity, content.data.inviteOnly];
    })
    await getRsvpStatus(this.state.id).then((content)=>{
      status = content.data;
    }).catch(()=>console.log("Failed to get Status"));

    await getCount(this.state.id).then((content)=>{
      curr = content.data;
    })
    await getinfo().then((content)=> {
      username = content.data.username;
    });
    
    this.setState({currentCapacity: curr, arr: array, ForceUpdateNow:false, status:status, username: username});
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
    const rsvp:any[] = [];
    const hostmgmt: any[] = [];
    if(!this.state.arr[6] || (this.state.status !== "NORSVP")){
      rsvp.push(<button className='DescriptionPageRsvpButton' onClick={this.rsvpNav}> RSVP </button>);
    }
    if(this.state.arr[1] === this.state.username){
      hostmgmt.push(
        <Link to = "/HostManagementPage">
          <button className="ManageButton">Host Management</button>
        </Link>
      );
    }

    var getDateFromObject : number[] = [this.state.arr[2]];
    var formattedDateInString = String(getDateFromObject[0]);
    var dateArr = formattedDateInString.split(",");
    var hourStr = String(dateArr[4]);
    var dateResult = dateArr[0] + "/" + dateArr[1] + "/" + dateArr[2] + " " + dateArr[3] + (hourStr.length == 1 ? ":0" : ":") + dateArr[4];

    return (
      <div className = "App">
        <header>
          <p className='descriptionPageTitle'>Event Description</p>
        </header>
        <div className='eventBody'>
          <label className="desName" htmlFor='title'>Event title : {this.state.arr[0]}</label>
          {rsvp}

          <div className="desName">
            <label htmlFor ='host'>Event host : {this.state.arr[1]}</label>
          </div>
          <div className='test'>
            Capacity : <br/>{this.state.currentCapacity}/{this.state.arr[5]}
          </div>

          <div className="desName">
            <label htmlFor ='date'>Event date : {dateResult}</label>
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

          
        </div>
        <div className='bottomnav'>
            <Link to = "/AttendeeListPage">
              <button className="buttomnavButton">Attendee List</button>
            </Link>
            <Link to = "/Dashboard">
              <button className="buttomnavButton">Dashboard</button>
            </Link>
            {hostmgmt}
        </div>
      </div>
    );
  }
}
export default withRouter(EventDescriptionPage);