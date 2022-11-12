import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Dropdown from 'react-dropdown'

class AttendeeListPage extends Component<any,any> {
    placeholder="Select a Status"
    options = [
        {label: 'Will Attend', value: 'WILLATTEND'},
        {label: 'Maybe', value: 'MAYBE'},
        {label: 'Will Not Attend', value: 'WONTATTEND'},
        {label: 'Nemesis', value: 'NEMESIS'},
        {label: 'Invited', value: 'INVITED'}
    ];
    defaultOption = this.options[0];
    render(){
        return (
            <div className='App'>
                <header>
                    <h1>Attendee List</h1>
                    <h4 className='Line'>Choose Status : </h4>
                    <Dropdown className="dropdownStatus"
                        options={this.options}
                        // onChange={this._onSelect}
                        value={this.defaultOption}
                        placeholder="Select"
                        />
                </header>
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