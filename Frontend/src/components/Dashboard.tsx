import "./Dashboard.css";
import { logout} from '../helpers/connector';
import { useNavigate } from 'react-router-dom';
import Dashboardtmp from './Dashboardtmp';

function Dashboard() {
    const navigate = useNavigate();
    const pagelogout = ()=>{
        logout().then(()=>{
            navigate("/")
        }).catch(()=>(alert("logout error")));
    }

    const createEvent = ()=>{
        navigate("/EventCreationPage")
    }
    return (
        <Dashboardtmp logout={pagelogout} createEvent={createEvent}/> 
    );
}


export default Dashboard;