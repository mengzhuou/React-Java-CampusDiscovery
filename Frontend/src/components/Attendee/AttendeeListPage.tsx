import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import { getRsvp } from '../../helpers/connector'
import AttendeeBox from './AttendeeBox';
import { textChangeRangeIsUnchanged } from 'typescript';

class AttendeeListPage extends Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {id: this.props.eventNum(), arr : [], xpos:window.scrollX, 
            ypos:window.scrollY, updateForced:false, ForceUpdateNow:false, Status:"ALL"};
        this.forceup = this.forceup.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }


    forceup(){
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

    placeholder="All RSVP"
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
            attendarr.push(<AttendeeBox
                email={this.state.arr[i][0]}
                status={this.state.arr[i][1]}
                eventNum={this.props.eventNum}
            />)
        }
        return (
            <div className='App'>
                <header>
                    <h1>Attendee List</h1>
                    <h4 className='Line'>Choose Status : </h4>
                    <Dropdown className="dropdownStatus"
                        options={this.options}
                        onChange={this.onSelect}
                        value={this.defaultOption}
                        placeholder="Select"
                        />
                </header>
                <div>
                    {attendarr}
                </div>
                <div className='bottomnav'>
                    <Link to = "/EventDescriptionPage">
                        <button className="buttomnavButton">Event Description</button>
                    </Link>
                    <Link to = "/Dashboard">
                        <button className="buttomnavButton">Dashboard</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default AttendeeListPage;