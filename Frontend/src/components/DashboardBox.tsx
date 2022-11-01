import { eventNames } from 'process';
import React, { Component } from 'react';
import './DashboardBox.css'

// export interface event {
//     title: string;
//     host: string;
//     date: string;
//     location: string;
//     descripton: string
// }


// export default function DashboardBox({title, host, date, location, descripton} : event) {
//     return (
//         <div className='box'>
//         <h1 className='title'> Title: {title}</h1>
//         <h4>Host: {host}</h4>
//         <h4>Date: {date}</h4>
//         <h4>Location: {location}</h4>
//         <h4>Descripton: {descripton}</h4>
//         </div>
//         )
// }
class DashboardBox extends Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {id: this.props.id}
    }
    render() {
        return (
        <div className='box'>
            <h1 className='title'> {this.props.title}</h1>
            <h4>Host: {this.props.host} </h4>
            <h4>Date: {this.props.date}</h4>
            <h4>Location: {this.props.location}</h4>
            <h4>Descripton: {this.props.description}</h4>
        </div>
        )
      }
}

export default DashboardBox;