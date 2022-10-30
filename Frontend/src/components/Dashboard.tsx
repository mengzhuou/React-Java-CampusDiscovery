// import React from 'react';
import {useState} from 'react';
import "./Dashboard.css";
import { logout, getinfo } from '../helpers/connector';
import { useNavigate } from 'react-router-dom';
import DashboardBox from './DashboardBox';
import Pagination from './Pagination';

function Dashboard() {
    const [currentPage, setCurrentPage] = useState(1);
    const lastPage = 3;

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
    <div className="AppDashboard">
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
        </div>
        <div className="container">
            <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                maxLength={10}
                setCurrentPage={setCurrentPage}
            />
        </div>
    </div>

    
    );
}

export default Dashboard;