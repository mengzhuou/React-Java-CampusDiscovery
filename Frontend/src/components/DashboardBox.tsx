import { eventNames } from 'process';
import React, { Component } from 'react';
import './DashboardBox.css'

export interface event {
    title: string;
    host: string;
    date: string;
    location: string;
    descripton: string
}


export default function DashboardBox({title, host, date, location, descripton} : event) {
    return (
        <div className='box'>
        <h1 className='title'> Title: {title}</h1>
        <h4>Host: {host}</h4>
        <h4>Date: {date}</h4>
        <h4>Location: {location}</h4>
        <h4>Descripton: {descripton}</h4>
        </div>
        )
}
// class DashboardBox extends Component {
//     // render() {
//     //     return (
//     //     <div className='box'>
//     //         <h1 className='title'> Title:</h1>
//     //         <h4>Host: this.props.value </h4>
//     //         <h4>Date:</h4>
//     //         <h4>Location:</h4>
//     //         <h4>Descripton:</h4>
//     //     </div>
//     //     )
//     //   }
// }

//export default DashboardBox;