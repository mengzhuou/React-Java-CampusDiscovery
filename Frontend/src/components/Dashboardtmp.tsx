// import React from 'react';
import React from 'react';
import "./Dashboard.css";
import { getinfo, getevent } from '../helpers/connector';
import DashboardBox from './DashboardBox';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';


class Dashboardtmp extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {currentPage: 1, lastpage: 6, arr: [], xpos:window.scrollX, ypos:window.scrollY, updateForced:false, ForceUpdateNow:false};
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.forceup = this.forceup.bind(this);
    }

    display() {
        getinfo().then((content)=>{
            alert(content.data);
        }).catch(()=>(alert("error getting info")));
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
                <p>Dashboard</p>
            </header> 
            <button className='logout' onClick={this.props.logout}>Logout</button>
            <button className='display' onClick={this.display}>Display</button>
            <button className='createEvent' onClick={this.props.createEvent}>Create A Event</button>
            <button className='All Event Or Invited'>All Event Or Invited: Need to change this to Drop down list</button>

            <div className='body'>
                <Link to = "/EventDescriptionPage">
                    {dasharr}
                </Link>
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


export default Dashboardtmp;