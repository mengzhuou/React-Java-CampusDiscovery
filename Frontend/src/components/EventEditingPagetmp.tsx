import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import "./HostManagementPage.css";
import 'react-css-dropdown/dist/index.css'
import { getinfo, eventdel, eventdeladmin} from '../helpers/connector'


class EventEditingPagetmp extends Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {id: this.props.eventNum(), role: "STUDENT"}
        this.forceup = this.forceup.bind(this);
        this.eventdel = this.eventdel.bind(this);
    }

    
  componentDidMount(): void {
    getinfo().then((content)=>this.setState({role:content.data})).catch(()=> console.log("failure to load role"));
  }
  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
    if(this.state.id != this.props.eventNum()){
      this.setState({id: this.props.eventNum()});
    }
  }
      
  async forceup() {
      this.setState({ForceUpdateNow:true});
  }
  eventdel(){
    let conf = window.confirm('Confirm or deny');
    if(conf){
      if(this.state.role === "ADMIN"){
          eventdeladmin(this.state.id).then(()=>{
              alert("successful update");
              console.log(this.state.id)
              this.props.navigate("/Dashboard")
          }).catch(()=>alert("unsuc update"));
      }else{
          eventdel(this.state.id).then(()=>{
              alert("successful update");
              this.props.navigate("/Dashboard")
          }).catch(()=>alert("unsuc update"));
      }
    }
  }

    render(){
        return (
          <div className = "App">
              <header className="App-header">
                <p>Edit Your Event<button onClick={()=>alert(this.props.eventNum())}>Event Number</button></p>
              </header>
              <form className="eventEditingForm" onSubmit={this.props.formik.handleSubmit}>
                  <div className="title">
                    <label htmlFor='title'>Event title : </label>
                    <input size={40} onChange={this.props.formik.handleChange} value={this.props.formik.values.title} id='title' name='title'></input>
                  </div>
    
                  <div className="host">
                    <label htmlFor ='host'>Event host : </label>
                    <input size={40} onChange={this.props.formik.handleChange} value = {this.props.formik.values.email} id='email' name='email'></input>
                  </div>
    
                  <div className="date">
                    <label htmlFor ='date'>Event date : </label>
                    <input size={40} onChange={this.props.formik.handleChange} value = {this.props.formik.values.time} id='time' name='date'></input>
                  </div>
    
                  <div className="location">
                    <label htmlFor ='location'>Event location : </label>
                    <input size={38} onChange={this.props.formik.handleChange} value = {this.props.formik.values.location} id='location' name='location'></input>
                  </div>
    
                  <div className="description">
                    <label htmlFor ='description'>Event description : </label>
                    <input size={35} onChange={this.props.formik.handleChange} value = {this.props.formik.values.description} id='description' name='description'></input>
                  </div>
                  <div>
                    <button className='eventEditPageButton' >Confirm Changes</button>
                  </div>
                  
                </form>
                <button className="eventEditPageButton" onClick={this.eventdel}>Delete</button>
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

export default EventEditingPagetmp;