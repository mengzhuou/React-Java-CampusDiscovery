import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardBox.css'

class DashboardBox extends Component {
    render() {
        return (
        <div className='box'>
            <a href="/eventEditing">
            <button className="button" type="submit">edit</button>
            </a>
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