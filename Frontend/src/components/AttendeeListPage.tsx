import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import { getRsvp } from '../helpers/connector'
import AttendeeBox from './AttendeeBox';

class AttendeeListPage extends Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {id: this.props.eventNum(), arr : [], xpos:window.scrollX, ypos:window.scrollY, updateForced:false, ForceUpdateNow:false};
        this.forceup = this.forceup.bind(this);
    }


    async forceup(){
        this.setState({ForceUpdateNow:true});
        
    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if(this.state.ForceUpdateNow){
            getRsvp(this.state.id).then((content)=>{
                let key;
                let array = [];
                for(key in content.data){
                    array.push([content.data[key].email, content.data[key].status]);
                }
                this.setState({arr:array});
                this.forceUpdate();
            })
            this.setState({ForceUpdateNow:false});
        }
    }
    componentDidMount(): void {
        getRsvp(this.state.id).then((content)=>{
            let key;
            let array = [];
            for(key in content.data){
                array.push([content.data[key].email, content.data[key].status]);
            }
            this.setState({arr:array});
        })
    }

    placeholder="Select a Status"
    options = [
        {label: 'Will Attend', value: 'WILLATTEND'},
        {label: 'Maybe', value: 'MAYBE'},
        {label: 'Will Not Attend', value: 'WONTATTEND'},
        {label: 'Nemesis', value: 'NEMESIS'},
        {label: 'Invited', value: 'INVITED'}
    ];
    defaultOption = this.options[0];

    render(){
        let dasharr: any[] = [];
        for (let i = 0; i < this.state.arr.length; i++){
            dasharr.push(<AttendeeBox
                email={this.state.arr[i][0]}
                status={this.state.arr[i][1]}
            />)
        }
        return (
            <div className='App'>
                <header>
                    <h1>Attendee List</h1>
                    <h4 className='Line'>Choose Status : </h4>
                    <Dropdown className="dropdownStatus"
                        options={this.options}
                        // onChange={this._onSelect}
                        value={this.defaultOption}
                        placeholder="Select"
                        />
                </header>
                <body>
                    {dasharr}
                </body>
                <div className='bottomnav'>
                    <Link to = "/EventDescriptionPage">
                        <button className="buttomnavButton">Event Description</button>
                    </Link>
                    <Link to = "/Dashboard">
                        <button className="buttomnavButton">Dashboard</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default AttendeeListPage;