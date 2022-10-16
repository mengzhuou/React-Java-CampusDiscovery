import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css";

  
function Dashboard() {
  const navigate = useNavigate();

  const goToSecondsComp = () => {
  
    // This will navigate to second component
    navigate('/second'); 
  };
  const gotToFirstComp = () => {
  
    // This will navigate to first component
    navigate('/first'); 
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome</p>
        <button className="WelcomePageButton" onClick={goToSecondsComp}>ViewUserDetail </button>
        <button className="WelcomePageButton" onClick={gotToFirstComp}>Sign Up </button>
      </header>
    </div>
  );
}
  
export default Dashboard;