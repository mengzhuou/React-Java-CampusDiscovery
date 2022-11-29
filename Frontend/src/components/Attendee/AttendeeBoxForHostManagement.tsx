import React, { Component } from 'react';
import './AttendeeBox.css'
import { hostRemove } from '../../helpers/connector'



class AttendeeBoxForHostManagement extends Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {updateForced: false, ForceUpdateNow: false}
        this.attendeeDel = this.attendeeDel.bind(this);
    }
    componentDidMount(): void {
        this.setState({ForceUpdateNow:true})
    }

    attendeeDel(){
        let conf = window.confirm('Confirm or deny');
        if(conf){
            hostRemove(this.props.eventNum(), this.props.email).then(()=>{ //need to be attendeeId
                alert("successful update");
                this.props.update();
            }).catch(()=>alert("unsuc update"));
        }
      }
    

    render() {
        return (
            <div className='AttendeeBox'>
                <div className='listElementManagement'>
                    Email : {this.props.email}  &nbsp;
                </div>
                <div className='listElementManagement'>
                    Status : {this.props.status}
                    <button className="eventEditPageButton" onClick={this.attendeeDel}>X</button> 
                </div>
            </div>
        )
    }
}

export default AttendeeBoxForHostManagement;