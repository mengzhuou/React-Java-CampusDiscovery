import "./YourEvent.css";
import { withRouter } from "../withRouter";
import React from 'react';
import { getPersonalRsvp} from '../../helpers/connector';
import DashboardBox from '../Dashboard/DashboardBox';
import "react-datepicker/dist/react-datepicker.css";



class Dashboard extends React.Component<any,any>{

    constructor(props:any){
        super(props);
        this.state = {isFilterBeforeChecked:false, isFilterAfterChecked:false,
             beforeDate: new Date(), afterDate: new Date(), hostEmailFilter: "",
             distance: "", currentPage: 1, lastpage: 6, arr: [], 
             xpos:window.scrollX, ypos:window.scrollY, updateForced:false, 
             ForceUpdateNow:false};
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.forceup = this.forceup.bind(this);
        this.passEventId = this.passEventId.bind(this);

    }

    back = () => {
        this.props.navigate("/Dashboard")
    }

    forceup(){
        this.setState({ForceUpdateNow:true});
        
    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if(this.state.ForceUpdateNow){
            getPersonalRsvp().then((content)=>{
                let key;
                let array = [];
                for(key in content.data){
                    array.push([content.data[key].event.title, content.data[key].event.email, content.data[key].event.time, 
                        content.data[key].event.id, content.data[key].status, content.data[key].conflict]);
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


        return (
            <div className="html">
                <div className="topnav">
                    <button className="topnavButton" onClick={this.back}>Dashboard</button>

                </div>
                <div className="AppDashboard"> 
                    <header>
                        <p className="header">Dashboard</p>

                    </header>
                    <div className='body'>
                        {dasharr}
                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(Dashboard);