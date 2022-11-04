import React from 'react';
import { Link } from 'react-router-dom';
import {useState} from 'react';
import "./Dashboard.css";
import { logout, getinfo, addevent, runall } from '../helpers/connector';
import { useNavigate } from 'react-router-dom';
import DashboardBox from './DashboardBox';
import Pagination from './Pagination';
import { eventNames } from 'process';
import { TypeOfExpression } from 'typescript';
import Dashboardtmp from './Dashboardtmp';
import { create } from 'domain';
import EventEditingPage from './EventDescriptionPage';



function Dashboard() {
    const navigate = useNavigate();
    const pagelogout = ()=>{
        logout().then(()=>{
            navigate("/")
        }).catch(()=>(alert("logout error")));
    }

    const createEvent = ()=>{
        navigate("/eventCreationPage")
    }
    return (
        <Dashboardtmp logout={pagelogout} createEvent={createEvent}/> 
    );
}


export default Dashboard;