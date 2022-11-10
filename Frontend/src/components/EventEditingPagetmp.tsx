import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import "./HostManagementPage.css";
import Dropdown from 'react-dropdown'
import 'react-css-dropdown/dist/index.css'

class EventEditingPagetmp extends Component<any,any> {
    constructor(props:any){
        super(props);
        this.forceup = this.forceup.bind(this);
    }

    async forceup() {
        this.setState({ForceUpdateNow:true});
    }

    render(){
        return (
            <div className = "App">
              <header className="App-header">
                <p>Edit Your Event<button onClick={()=>alert(this.props.eventNum())}>Event Number</button></p>
                <form className="eventEditingForm" onSubmit={this.props.formik.handleSubmit}>
                    <div className="title">
                      <label htmlFor='title'>Event title : </label>
                      <input size={54.5} onChange={this.props.formik.handleChange} value={this.props.formik.values.title} id='title' name='title'></input>
                    </div>
      
                    <div className="host">
                      <label htmlFor ='host'>Event host : </label>
                      <input size={55} onChange={this.props.formik.handleChange} value = {this.props.formik.values.email} id='email' name='email'></input>
                    </div>
      
                    <div className="date">
                      <label htmlFor ='date'>Event date : </label>
                      <input size={55} onChange={this.props.formik.handleChange} value = {this.props.formik.values.time} id='time' name='date'></input>
                    </div>
      
                    <div className="location">
                      <label htmlFor ='location'>Event location : </label>
                      <input size={51} onChange={this.props.formik.handleChange} value = {this.props.formik.values.location} id='location' name='location'></input>
                    </div>
      
                    <div className="description">
                      <label htmlFor ='description'>Event description : </label>
                      <input size={48} onChange={this.props.formik.handleChange} value = {this.props.formik.values.description} id='description' name='description'></input>
                    </div>
                    <div>
                      <button className='editSubmitButton' >Confirm Changes</button>
                    </div>
      
                    <Link to = "/HostManagementPage">
                      <button className="button">Host Management</button>
                    </Link>
                    <Link to = "/Dashboard">
                        <button className="button">Dashboard</button>
                    </Link>
                </form>
              </header>
            </div>
          );
    }
}

export default EventEditingPagetmp;