import { Link } from 'react-router-dom';
import "./EventDescriptionPage.css";
import "./Dashboard.css";
import Modal from "./Modal";
import useModal from "./UseModal";
import { Component } from 'react';
import { getevent} from '../helpers/connector';
import DashboardBox from './DashboardBox';
  
class EventDescriptionPage extends Component<any,any> {
  constructor(props:any){
    super(props);
    this.forceup = this.forceup.bind(this);
  }

  async forceup() {
    this.setState({ForceUpdateNow: true});
  }

componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
  if(this.state.ForceUpdateNow){
      getevent(this.state.currentPage).then((content)=>{
          let key;
          let array = [];
          for(key in content.data){
              array.push([content.data[key].title, content.data[key].email, content.data[key].time, 
                  content.data[key].location, content.data[key].description, content.data[key].id]);
          }
          this.setState({arr:array});
          this.forceUpdate();
      })
      this.setState({ForceUpdateNow:false});
  }
}

showEventIdAndPage = () => {
  alert(this.props.eventNum())//show event id
  alert(this.props.eventPage())
}


  render(){
    return (
      <div className = "App">
        <header className="App-header">
          <p>Event Description</p>
          <button onClick={this.showEventIdAndPage}>Event Number</button>
          <form className="eventDescriptionForm">
              <div className="desName">
                <label htmlFor='title'>Event title :</label>
              </div>
  
              <div className="desName">
                <label htmlFor ='host'>Event host : </label>
              </div>
  
              <div className="desName">
                <label htmlFor ='date'>Event date : </label>
              </div>
  
              <div className="desName">
                <label htmlFor ='location'>Event location : </label>
              </div>
  
              <div className="desName">
                <label htmlFor ='description'>Event description : </label>
              </div>
  
              <div className="desName">
                <p>Your RSVP Status: </p>
              </div>
              <Link to = "/AttendeeListPage">
                <button className="button">Attendee List</button>
              </Link>
              <Link to = "/HostManagementPage">
                <button className="button">Host Management</button>
              </Link>
              <Link to = "/Dashboard">
                <button className="button">Dashboard</button>
              </Link>
          </form>
          
          <div onClick={this.props.useModal}>
            <button className='button' onClick={this.props.toggle}> RSVP </button>
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}></Modal>
          </div>
        </header>
      </div>
    );
  }
}

export default EventDescriptionPage;