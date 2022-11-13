import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import "./HostManagementPage.css";
import Dropdown from 'react-dropdown'
import 'react-css-dropdown/dist/index.css'
import { getRsvp, rsvpDel } from '../helpers/connector'
import AttendeeBox from './AttendeeBox';


class HostManagementPagetmp extends Component<any,any> {
    constructor(props:any){
        super(props);
        this.forceup = this.forceup.bind(this);
        this.state = {id: this.props.eventNum(), arr : [], xpos:window.scrollX, ypos:window.scrollY, updateForced:false, ForceUpdateNow:false};

    }

    async forceup() {
        this.setState({ForceUpdateNow:true});
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if(this.state.ForceUpdateNow){
            getRsvp(this.state.id).then((content)=>{
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
        getRsvp(this.state.id).then((content)=>{
            let key;
            let array = [];
            for(key in content.data){
                array.push([content.data[key].email, content.data[key].status]);
            }
            this.setState({arr:array});
        })
    }


    placeholder="Select a Status"
    options = [
        {label: 'Will Attend', value: 'WILLATTEND'},
        {label: 'Maybe', value: 'MAYBE'},
        {label: 'Will Not Attend', value: 'WONTATTEND'},
        {label: 'Nemesis', value: 'NEMESIS'},
        {label: 'Invited', value: 'INVITED'}
    ];

    defaultOption = this.options[2];


    render(){
        let dasharr: any[] = [];
        for (let i = 0; i < this.state.arr.length; i++){
            dasharr.push(<AttendeeBox
                email={this.state.arr[i][0]}
                status={this.state.arr[i][1]}
            />)
        }
        return (
            <div className='App'>
                <header>
                    <h1>Host Management</h1>
                    <h4 className='Line'>Choose Status : </h4>
                    <Dropdown className="dropdownStatus"
                        options={this.options}
                        // onChange={this._onSelect}
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
                    {dasharr}
                    <button className="button">X</button>

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