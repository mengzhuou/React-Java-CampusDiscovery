// import React from 'react';
import {useState} from 'react';
import "./Dashboard.css";
import { logout, getinfo, addevent, runall } from '../helpers/connector';
import { useNavigate } from 'react-router-dom';
import DashboardBox from './DashboardBox';
import { event } from './DashboardBox'
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

    const createEvent = ()=>{
        navigate("/eventCreation")
    }

    
   
    let arr: event[] = [];
    arr.push({title: "adfadsf", host: "adfaf", date: "adfdf", location: "adsfd", descripton: "adfdfadf"})
    const Event1: event = {title: "Midnight Breakfast",host: "Student Orgs",date: "Dec 9", location: "Tech Green", descripton: "Come get Free breakfast!!!"};
    //const Event2: event = {title: "Freshman Cake Race",host: "COC",date: "Dec 3", location: "CRC", descripton: "Race for Cake!!!"};
    const Event2: event = arr[0];
    return (
    <div className="AppDashboard">
        <header className="header">
            <p>Dashboard</p>
        </header> 
        <button className='logout' onClick={pagelogout}>Logout</button>
        <button className='display' onClick={display}>Display</button>
        <button className='createEvent' onClick={createEvent}>Create A Event</button>

        <div className='body'>
            <div className='column1'>
            <DashboardBox {...Event1}  ></DashboardBox>
            <DashboardBox {...Event2}  ></DashboardBox>
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