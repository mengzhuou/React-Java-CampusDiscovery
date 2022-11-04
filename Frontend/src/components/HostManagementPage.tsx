import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class HostManagementPage extends Component<any,any> {
    render(){
        return (
            <div className='App'>
                <p>Host Management</p>
                <Link to = "/EventDescriptionPage">
                    <button className="button">Event Description</button>
                </Link>
                <Link to = "/EventEditingPage">
                    <button className="button">Event Editing</button>
                </Link>
                {/* to delete attendee. */}
                <button className="button">X</button>
                <button className="button">Add/Invite</button>
            </div>
            


        );
    }
}

export default HostManagementPage;