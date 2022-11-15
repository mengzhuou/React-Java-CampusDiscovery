import React, { Component } from 'react';
import './AttendeeBox.css'
import { hostRemove } from '../helpers/connector'



class AttendeeBoxForHostManagement extends Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {id: this.props.eventNum(), email: this.props.email, status: this.props.status, updateForced: false, ForceUpdateNow: false}
        this.attendeeDel = this.attendeeDel.bind(this);
    }
    componentDidMount(): void {
        this.setState({ForceUpdateNow:true})
    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if(this.state.id != this.props.eventNum()){
            this.setState({id: this.props.eventNum()});  //should probably be id: this.state.id
        }
    }

    attendeeDel(){
        let conf = window.confirm('Confirm or deny');
        if(conf){
            hostRemove(this.state.id, this.state.email).then(()=>{ //need to be attendeeId
                alert("successful update");
                this.props.update();
            }).catch(()=>alert("unsuc update"));
        }
      }
    

    render() {
        return (
            <div className='AttendeeBox'>
                <p>
                    Email : {this.state.email}  Status : {this.state.status}
                    {/* delete this attendee */}
                    <button className="eventEditPageButton" onClick={this.attendeeDel}>X</button> 
                </p>
            </div>
        )
    }
}

export default AttendeeBoxForHostManagement;