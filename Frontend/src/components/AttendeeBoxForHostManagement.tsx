import React, { Component } from 'react';
import './AttendeeBox.css'
import { getRsvp, updateRsvp } from '../helpers/connector'



class AttendeeBoxForHostManagement extends Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {id: this.props.eventNum(), updateForced: false, ForceUpdateNow: false}
    }
    componentDidMount(): void {
        this.setState({ForceUpdateNow:true})
    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if(this.state.id != this.props.id){
            this.setState({id: this.props.id});  //should probably be id: this.state.id
        }
    }

    eventdel(){
        let conf = window.confirm('Confirm or deny');
        if(conf){
            updateRsvp(this.state.id, "DELETE").then(()=>{ //need to be attendeeId
                alert("successful update");
                // this.props.navigate("/HostManagementPagetmp") bug: probably cannot update with deleted attendee
            }).catch(()=>alert("unsuc update"));
        }
      }
    

    render() {
        return (
            <div className='AttendeeBox'>
                <p>
                    Email : {this.props.host}  Status : {this.props.date}
                    {/* delete this attendee */}
                    <button className="eventEditPageButton" onClick={this.eventdel}>X</button> 
                    

                </p>
            </div>
        )
    }
}

export default AttendeeBoxForHostManagement;