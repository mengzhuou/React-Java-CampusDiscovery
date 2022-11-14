import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import "./HostManagementPage.css";
import Dropdown from 'react-dropdown'
import 'react-css-dropdown/dist/index.css'
import { getRsvp } from '../helpers/connector'
import AttendeeBoxForHostManagement from './AttendeeBoxForHostManagement';


class HostManagementPagetmp extends Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {id: this.props.eventNum(), Status: "ALL", arr : [], xpos:window.scrollX, ypos:window.scrollY, updateForced:false, ForceUpdateNow:false};
        this.forceup = this.forceup.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    async forceup() {
        this.setState({ForceUpdateNow:true});
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if(this.state.ForceUpdateNow){
            getRsvp(this.state.id, this.state.Status).then((content)=>{
                let key;
                let array = [];
                for(key in content.data){
                    array.push([content.data[key].email, content.data[key].status]);
                }
                this.setState({arr:array});
                this.forceUpdate();
            })
            this.setState({ForceUpdateNow:false});
        }
    }
    componentDidMount(): void {
        this.forceup();
    }

    onSelect(event:any){
        this.setState({Status:event.value, ForceUpdateNow:true})
    }
    placeholder="Select a Status"
    options = [
        {label: 'All RSVP', value: 'ALL'},
        {label: 'Will Attend', value: 'WILLATTEND'},
        {label: 'Maybe', value: 'MAYBE'},
        {label: 'Will Not Attend', value: 'WONTATTEND'},
        {label: 'Nemesis', value: 'NEMESIS'},
        {label: 'Invited', value: 'INVITED'}
    ];

    defaultOption = this.options[0];


    render(){
        let attendarr: any[] = [];
        for (let i = 0; i < this.state.arr.length; i++){
            attendarr.push(<AttendeeBoxForHostManagement
                email={this.state.arr[i][0]}
                status={this.state.arr[i][1]}
                eventNum={this.props.eventNum}
            />)
        }
        return (
            <div className='App'>
                <header>
                    <h1>Host Management</h1>
                    <h4 className='Line'>Choose Status : </h4>
                    <Dropdown className="dropdownStatus"
                        options={this.options}
                        onChange={this.onSelect}
                        value={this.defaultOption}
                        placeholder="Select"
                    />
                </header>
                <body>
                    <form onSubmit={this.props.formik.handleSubmit}>
                        <h4 className='Line'>Invite An Attendee :</h4>
                        <input type='text' className='formik' placeholder='Email Address' onChange={this.props.formik.handleChange} value = {this.props.formik.values.email} name="email"></input>
                        <button className='inviteButton' type='submit'>Submit</button>
                    </form>
                    {attendarr}

                </body>

                <div className='bottomnav'>
                    <Link to = "/EventDescriptionPage">
                        <button className="buttomnavButton">Description</button>
                    </Link>
                    <Link to = "/EventEditingPage">
                        <button className="buttomnavButton">Edit Your Event</button>
                    </Link>
                    <Link to = "/Dashboard">
                        <button className="buttomnavButton">Dashboard</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default HostManagementPagetmp;