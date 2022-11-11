import { Link } from 'react-router-dom';
import "./EventDescriptionPage.css";
import "./Dashboard.css";
import Modal from "./Modal";
import useModal from "./UseModal";
import { Component } from 'react';
import { getevent, getRsvp } from '../helpers/connector';
import DashboardBox from './DashboardBox';
  
class EventDescriptionPage extends Component<any,any> {
  constructor(props:any){
    super(props);
    this.state = {id: this.props.id, currentPage: 1, arr: [], updateForced:false, ForceUpdateNow:false};
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
              if (this.props.eventNum() === content.data[key].id){
                console.log(content.data[key].id + "is content id" + this.props.eventNum()  + " is event id");
                array.push([content.data[key].title, content.data[key].email, content.data[key].time, 
                    content.data[key].location, content.data[key].description, content.data[key].id]);
              }
            }
            this.setState({arr:array});
            this.forceUpdate();
        })
        this.setState({ForceUpdateNow:false});
    }
  }

  componentDidMount(): void {
    getevent(this.state.currentPage).then((content)=>{
        let key;
        let array = [];
        for(key in content.data){
          if (this.props.eventNum() === content.data[key].id){
            console.log(content.data[key].id + "is content id" + this.props.eventNum()  + " is event id");
            array.push([content.data[key].title, content.data[key].email, content.data[key].time, 
                content.data[key].location, content.data[key].description, content.data[key].id]);
          }
        }
        this.setState({arr:array});
      })
    }

  showEventIdAndPage = () => {
    alert(this.props.eventNum())//show event id
    alert(this.props.eventPage())
  }

  // showEventStatus() {
  //   getRsvp().then((content)=>{

  //   })
  // }

  render(){

    
    // let dasharr: any[] = [];
    
    // for(let i = 0; i < this.state.arr.length; i++){
    //     dasharr.push(<DashboardBox 
    //         title={this.state.arr[i][0]}
    //         host={this.state.arr[i][1]}
    //         date={this.state.arr[i][2]}
    //         location={this.state.arr[i][3]}
    //         description={this.state.arr[i][4]}
    //         id ={this.state.arr[i][5]}
    //         update={this.forceup}
    //         />);
    // }


    let dasharr: any[] = [];
    
    for(let i = 0; i < this.state.arr.length; i++){
      console.log(this.state.arr[i][0]);
        dasharr.push([
            this.state.arr[i][0],
            this.state.arr[i][1],
            this.state.arr[i][2],
            this.state.arr[i][3],
            this.state.arr[i][4],
            this.state.arr[i][5],
        ]);
    }

    return (
      <div className = "App">
        <header className="App-header">
          <p>Event Description</p>
          <button onClick={this.showEventIdAndPage}>Event Number</button>
        </header>
        <body className='eventBody'>
          <div>
            {/* hello {dasharr[0][0]} */}
          </div>
          <div className="desName">
            <label htmlFor='title'>Event title :  : vessssssssssssssssssssnt tidddddddddddddddddddddddddd {this.props.arr}</label>
          </div>

          <div className="desName">
            <label htmlFor ='host'>Event host : {this.props.host}</label>
          </div>

          <div className="desName">
            <label htmlFor ='date'>Event date : {this.props.date}</label>
          </div>

          <div className="desName">
            <label htmlFor ='location'>Event location : {this.props.location}</label>
          </div>

          <div className="desName">
            <label htmlFor ='description'>Event description : {this.props.description}</label>
          </div>

          <div className="desName">
            <p>Your RSVP Status : </p>
          </div>
          <div onClick={this.props.useModal}>
              <button className='button' onClick={this.props.toggle}> RSVP </button>
              <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}></Modal>
          </div>
          
        </body>
        <div className='bottomnav'>
            <Link to = "/AttendeeListPage">
              <button className="buttomnavButton">Attendee List</button>
            </Link>
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

export default EventDescriptionPage;