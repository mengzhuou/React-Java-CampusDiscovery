// import React from 'react';
import {useState} from 'react';
import "./Dashboard.css";
import { logout, getinfo, addevent, runall } from '../helpers/connector';
import { useNavigate } from 'react-router-dom';
import DashboardBox from './DashboardBox';
import Pagination from './Pagination';
import { eventNames } from 'process';
import { TypeOfExpression } from 'typescript';


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

    
   
    let arr: any = [];
    arr.push(["Midnight Breakfast", "Student Orgs", "Dec 9", "Tech Green", "Come get Free breakfast!!!"]);
    arr.push(["Freshman Cake Race", "COC", "Dec 3", "CRC", "Race for Cake!!!"]);
    arr.push(["UGA Football game", "Football team", "Dec 3", "Bobby Dodd", "THWG"]);
    arr.push(["Freshman Cake Race", "COC", "Dec 3", "CRC", "Race for Cake!!!"]);
    arr.push(["Freshman Cake Race", "COC", "Dec 3", "CRC", "Race for Cake!!!"]);
    const lengthofEvents: number = arr.length;
    let dasharr: any[] = [];

    for(let i = 0; i < arr.length; i++){
        dasharr.push(<DashboardBox 
            title={arr[i][0]}
            host={arr[i][1]}
            date={arr[i][2]}
            location={arr[i][3]}
            description={arr[i][4]}
            />);
    }
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
            {dasharr}
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