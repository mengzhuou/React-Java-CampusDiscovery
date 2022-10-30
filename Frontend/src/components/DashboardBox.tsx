import React, { Component } from 'react';
import './DashboardBox.css'

class DashboardBox extends Component {
    render() {
        return (
        <div className='box'>
            <h1 className='title'> Title:</h1>
            <h4>Host:</h4>
            <h4>Date:</h4>
            <h4>Location:</h4>
            <h4>Descripton:</h4>
        </div>
        )
      }
}

export default DashboardBox;