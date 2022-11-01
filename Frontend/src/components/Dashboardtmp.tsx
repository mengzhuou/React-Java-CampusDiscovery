// import React from 'react';
import React from 'react';
import "./Dashboard.css";
import { logout, getinfo, getevent } from '../helpers/connector';
import DashboardBox from './DashboardBox';
import Pagination from './Pagination';
import { arrayBuffer } from 'node:stream/consumers';


class Dashboardtmp extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {currentPage: 1, lastpage: 6, arr: []};
        this.setCurrentPage = this.setCurrentPage.bind(this);
    }

    display() {
        getinfo().then((content)=>{
            alert(content.data);
        }).catch(()=>(alert("error getting info")));
    }

    setCurrentPage(page:number){
        this.setState({currentPage:page});
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
        const lengthofEvents: number = this.state.arr.length;
        let dasharr: any[] = [];

        for(let i = 0; i < this.state.arr.length; i++){
            dasharr.push(<DashboardBox 
                title={this.state.arr[i][0]}
                host={this.state.arr[i][1]}
                date={this.state.arr[i][2]}
                location={this.state.arr[i][3]}
                description={this.state.arr[i][4]}
                id ={this.state.arr[i][5]}
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

            <div className='body'>
                <div className='column1'>
                {dasharr}
                </div>
            </div>
            <div className="container">
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