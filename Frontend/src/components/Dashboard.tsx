import "./Dashboard.css";
import { withRouter } from "./withRouter";
import React from 'react';
import { getinfo, getevent, logout} from '../helpers/connector';
import DashboardBox from './DashboardBox';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown'



class Dashboard extends React.Component<any,any>{
    placeholder="Select a Status"
    options = [
        {label: 'All Event', value: 'ALLEVENT'},
        {label: 'Invited', value: 'INVITED'}
    ];

    defaultOption = this.options[2];

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

    eventDescrip = () => {
        this.props.navigate("/EventDescriptionPage")
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
        <div>
            <div className="topnav">
                <button className="topnavButton" onClick={this.pagelogout}>Logout</button>
                <button className="topnavButton" onClick={this.display}>Display</button>
                <button className="topnavButton" onClick={this.createEvent}>Create A Event</button>
                <button className="topnavButton" onClick={this.eventDescrip}>Event Description</button>
            </div>
            <div className="AppDashboard"> 
                <header className="header">
                    <p>Dashboard<button onClick={this.setpageNum}>set page</button></p>
                </header> 
                {/* need to be dropdown list */}
                <Dropdown className="dropDownEvent"
                    options={this.options}
                    // onChange={this._onSelect}
                    value={this.defaultOption}
                    placeholder="All Event"
                />
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
        </div>
        );
    }
}


export default withRouter(Dashboard);