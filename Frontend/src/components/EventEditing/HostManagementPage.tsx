import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import "./HostManagementPage.css";
import Dropdown from 'react-dropdown'
import 'react-css-dropdown/dist/index.css'
import { getRsvp, hostInvite } from '../../helpers/connector'
import AttendeeBoxForHostManagement from '../Attendee/AttendeeBoxForHostManagement';
import { emailValidator } from '../../helpers/emailValidator';


class HostManagementPage extends Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {id: this.props.eventNum(), Status: "ALL", arr : [], xpos:window.scrollX, ypos:window.scrollY, 
            updateForced:false, ForceUpdateNow:false, email:'', ref:React.createRef()};
        this.forceup = this.forceup.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    forceup() {
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
    onClick(){
        var text:string = "email = "+ this.state.email;
        if (window.confirm(text)){
            const emailError = emailValidator(this.state.email)
            if (emailError) {
                alert("invalid email")
                return
            }
            else{
                hostInvite(this.props.eventNum(), this.state.email).then(()=>{
                    alert("You have added " + this.state.email + " to your event!")
                    this.forceup();
                    let temp:any = this.state.ref;
                    temp.current.value = '';
                    this.setState({ref:temp});
                }).catch(()=>(alert("invalid email2")))
            }
        }
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
        let countArr : number[] = [];
        for (let i = 0; i < this.state.arr.length; i++){
            countArr.push(i+1);
            attendarr.push(<AttendeeBoxForHostManagement
                email={this.state.arr[i][0]}
                status={this.state.arr[i][1]}
                eventNum={this.props.eventNum}
                update={this.forceup}
            />)
        }

        const cssBox: any[] = [];
        if(attendarr.length!=0){
            cssBox.push(
                
                <div className='indexListManagement'>
                    {countArr.map(index => <div>{index}</div>)}
                </div>
            )
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
                <div>
                    <h4 className='Line'>Invite An Attendee :</h4>
                    <input ref={this.state.ref} type='text' className='formik' placeholder='Email Address' name="email" onChange={(evt)=>this.setState({email:evt.target.value})}></input>
                    <button className='inviteButton' type='submit' onClick={this.onClick}>Submit</button>
                </div>
                <div className="IndexAndList">
                    {cssBox}
                    <div>
                        {attendarr}
                    </div>
                </div>
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

export default HostManagementPage;