import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class AttendeeListPage extends Component<any,any> {
    render(){
        return (
            <div className='App'>
                <p>Attendee List</p>
                <button className="button">DropDown List for attending status</button>
                <Link to = "/EventDescriptionPage">
                    <button className="button">Event Description</button>
                </Link>
            </div>
        );
    }
}

export default AttendeeListPage;