import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'
  
function Dashboard() {
  return (
    <div className="App">
      <header className="logout">  
        <Link to="/">go back</Link>
      </header> 
      <header className="header">
        <p>Events</p>
      </header> 
    </div>
    
  );
}
  
export default Dashboard;