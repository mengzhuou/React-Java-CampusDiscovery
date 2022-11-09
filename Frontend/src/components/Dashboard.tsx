import "./Dashboard.css";
import { withRouter } from "./withRouter";
import React from 'react';
import { getinfo, getevent, logout} from '../helpers/connector';
import DashboardBox from './DashboardBox';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';



class Dashboard extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {currentPage: 1, lastpage: 6, arr: [], xpos:window.scrollX, ypos:window.scrollY, updateForced:false, ForceUpdateNow:false};
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.forceup = this.forceup.bind(this);
        this.pagelogout = this.pagelogout.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.setpageNum = this.setpageNum.bind(this);
    }

    display() {
        getinfo().then((content)=>{
            alert(content.data);
        }).catch(()=>(alert("error getting info")));
    }

    pagelogout = ()=>{
        logout().then(()=>{
            this.props.navigate("/")
        }).catch(()=>(alert("logout error")));
    }

    createEvent = ()=>{
        this.props.navigate("/EventCreationPage")
    }

    async forceup(){
        this.setState({ForceUpdateNow:true});
        
    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if(this.state.ForceUpdateNow){
            getevent(this.state.currentPage).then((content)=>{
                let key;
                let array = [];
                for(key in content.data){
                    array.push([content.data[key].title, content.data[key].email, content.data[key].time, 
                        content.data[key].location, content.data[key].description, content.data[key].id]);
                }
                this.setState({arr:array});
                this.forceUpdate();
            })
            this.setState({ForceUpdateNow:false});
        }
    }

    setCurrentPage(page:number){
        this.setState({currentPage:page, ForceUpdateNow:true});
    }

    componentDidMount(): void {
        getevent(this.state.currentPage).then((content)=>{
            let key;
            let array = [];
            for(key in content.data){
                array.push([content.data[key].title, content.data[key].email, content.data[key].time, 
                    content.data[key].location, content.data[key].description, content.data[key].id]);
            }
            this.setState({arr:array});
        })
    }
    setpageNum(): void{
        let page = Number(prompt("page:"));
        this.props.setEventID(page);
    }

    render(){
        let dasharr: any[] = [];

        for(let i = 0; i < this.state.arr.length; i++){
            dasharr.push(<DashboardBox 
                title={this.state.arr[i][0]}
                host={this.state.arr[i][1]}
                date={this.state.arr[i][2]}
                location={this.state.arr[i][3]}
                description={this.state.arr[i][4]}
                id ={this.state.arr[i][5]}
                update={this.forceup}
                />);
        }
        return (
        <div className="AppDashboard">
            <header className="header">
                <p>Dashboard<button onClick={this.setpageNum}>set page</button></p>
            </header> 
            <button className='logout' onClick={this.pagelogout}>Logout</button>
            <button className='display' onClick={this.display}>Display</button>
            <button className='createEvent' onClick={this.createEvent}>Create A Event</button>
            {/* need to be dropdown list */}
            <button className="button">All Event Or Invited</button>
            <Link to = "/EventDescriptionPage">
                <button className="button">Event Description</button>
            </Link>
            <div className='body'>
                {dasharr}
            </div>
            <div className="pagination">
                <Pagination
                    currentPage={this.state.currentPage}
                    lastPage={this.state.lastPage}
                    maxLength={10}
                    setCurrentPage={this.setCurrentPage}
                />
            </div>
        </div>
        );
    }
}


export default withRouter(Dashboard);