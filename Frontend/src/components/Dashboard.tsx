import "./Dashboard.css";
import { withRouter } from "./withRouter";
import React, { useState } from 'react';
import { getinfo, getevent, logout} from '../helpers/connector';
import DashboardBox from './DashboardBox';
import Pagination from './Pagination';
import Checkbox from "./Checkbox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



class Dashboard extends React.Component<any,any>{
    // placeholder="Select a Status"
    // options = [
    //     {label: 'All Event', value: 'ALLEVENT'},
    //     {label: 'Invited', value: 'INVITED'}
    // ];

    // defaultOption = this.options[2];

    constructor(props:any){
        super(props);
        this.state = {hostEmailFilter: "none",distance: "none", startDate: new Date(),currentPage: 1, lastpage: 6, arr: [], xpos:window.scrollX, ypos:window.scrollY, updateForced:false, ForceUpdateNow:false, isFilterChecked: false};
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.forceup = this.forceup.bind(this);
        this.pagelogout = this.pagelogout.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.passEventId = this.passEventId.bind(this);
        this.changeCheckedState = this.changeCheckedState.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.setDistance = this.setDistance.bind(this);
        this.getHostFromFilter = this.getHostFromFilter.bind(this);

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

    forceup(){
        this.setState({ForceUpdateNow:true});
        
    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if(this.state.ForceUpdateNow){
            getevent(this.state.currentPage,"none","none","-1","-1",this.state.distance,this.state.hostEmailFilter).then((content)=>{
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
        this.forceup();
    }
    passEventId(eventId: number): void{
        this.props.setEventID(eventId);
        this.props.navigate("/EventDescriptionPage");
    }

    changeCheckedState = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({isFilterChecked: e.target.checked});
        console.log("check if checked : " + this.state.isFilterChecked)        
    }

    dateChange(date: Date){
        console.log('created by Nina!', date);
        this.setState({
            startDate: date
        });
    }

    setDistance(e: React.FormEvent<HTMLInputElement>){
        this.setState({
            distance: e.currentTarget.value
        })
    }

    getHostFromFilter(e: React.FormEvent<HTMLInputElement>){
        this.setState({
            hostEmailFilter: e.currentTarget.value
        })
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
                key ={this.state.arr[i][5]}
                update={this.forceup}
                setEventID={this.passEventId}
                />);
        }

        // const { startDate } = this.state;

        return (
            <div className="html">
                <div className="topnav">
                    <button className="topnavButton" onClick={this.pagelogout}>Logout</button>
                    <button className="topnavButton" onClick={this.display}>Display</button>
                    <button className="topnavButton" onClick={this.createEvent}>Create A Event</button>
                </div>
                <div className="AppDashboard"> 
                    <header>
                        <p className="header">Dashboard</p>

                    </header>
                    <div className="sidenav">
                        <h1 >Filters</h1> 
                        {/* <div>clear</div> //clear filter*/}
                        <div>
                            <label>Choose Date : {JSON.stringify(this.state.startDate)}</label>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={this.state.startDate} 
                                onChange={this.dateChange}
                            />
                            <Checkbox
                                handleChange={this.changeCheckedState}
                                isChecked={this.state.isFilterChecked}
                                label="Before Date : "
                            />
                            <Checkbox
                                handleChange={this.changeCheckedState}
                                isChecked={this.state.isFilterChecked}
                                label="After Date : "
                            />
                        </div>
                        <div>
                            <label>Distance : {this.state.distance}</label>
                            <input
                                onChange={this.setDistance}
                                value={this.state.distance}
                                className="mileInputStyle"
                            />
                            <label>miles from your current location</label>
                        </div>

                        <div>
                            <label>Host : {this.state.hostEmailFilter}</label>
                            <input
                                onChange={this.getHostFromFilter}
                                placeholder="Email"
                                value={this.state.hostEmailFilter}
                                className="hostInputStyle"
                            />
                        </div>

                        <button className="filterButton">Confirm Filter</button>
                    </div>
                    <div className='body'>
                        {/* <Dropdown className="dropDownEvent"
                            options={this.options}
                            // onChange={this._onSelect}
                            value={this.defaultOption}
                            placeholder="All Event"
                        /> */}
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