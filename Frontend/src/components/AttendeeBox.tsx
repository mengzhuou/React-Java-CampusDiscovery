import React, { Component } from 'react';
import './AttendeeBox.css'


class AttendeeBox extends Component<any,any> {
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

    render() {
        return (
            <div className='AttendeeBox'>
                <p>
                    Email : {this.props.host}  Status : {this.props.date}
                </p>
            </div>
        )
    }
}

export default AttendeeBox;