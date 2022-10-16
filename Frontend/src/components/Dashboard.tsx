import React from 'react';
import "./Dashboard.css";
import { logout, getinfo } from '../helpers/connector';
import { useNavigate } from 'react-router-dom';
  
function Dashboard() {
    const navigate = useNavigate();
    const pagelogout = ()=>{
        logout().then(()=>{
            navigate("/")
        }).catch(()=>(alert("logout error")));
    }

    const display = ()=>{
        getinfo().then((content)=>{
            alert(content.data);
        }).catch(()=>(alert("error getting info")));
    }

    return (
    <div className="App">
        <header className="header">
        <p>Dashboard</p>
        </header> 
        <button className='logout' onClick={pagelogout}>logout</button>
        <button className='display' onClick={display}>display</button>
    </div>
    );
}

export default Dashboard;