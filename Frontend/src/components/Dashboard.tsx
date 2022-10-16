import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'
import './DashboardBox'
import DashboardBox from './DashboardBox';
  
function Dashboard() {
  return (
    <div className="App">
      <header className="logout">  
        <Link to="/">go back</Link>
      </header> 
      <header className="header">
        <p>Events</p>
      </header> 

      <div className='body'>
        <div className='column1'>
         <DashboardBox></DashboardBox>
         <DashboardBox></DashboardBox>
        </div>

        <div className='column2'>
          <DashboardBox></DashboardBox>
          <DashboardBox></DashboardBox>
        </div>

      </div>


    </div>
  );
}

  
export default Dashboard;