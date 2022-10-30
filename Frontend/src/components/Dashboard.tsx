import React from 'react';
import "./Dashboard.css";
import { logout, getinfo } from '../helpers/connector';
import { useNavigate } from 'react-router-dom';
import DashboardBox from './DashboardBox';
  
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

    const edit = ()=>{
        logout().then(()=>{
            navigate("/eventEditing")
        }).catch(()=>(alert("logout error")));
    }

    return (
    <div className="App">
        <header className="header">
        <p>Dashboard</p>
        </header> 
        <button className='logout' onClick={pagelogout}>logout</button>
        <button className='display' onClick={display}>display</button>
        <button className='edit' onClick={edit}>edit</button>

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