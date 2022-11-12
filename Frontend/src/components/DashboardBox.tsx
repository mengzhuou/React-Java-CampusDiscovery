import React, { Component } from 'react';
import { getinfo, updatedescription, updatedescriptionadmin, 
    updatelocation, updatelocationadmin, updatetime, 
    updatetimeadmin, updatetitle, updatetitleadmin, updateEmailadmin, eventdel, eventdeladmin} from '../helpers/connector'
import './DashboardBox.css'


class DashboardBox extends Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {id: this.props.id, page: this.props.page, role: "STUDENT"}
        this.passEventId = this.passEventId.bind(this);
        this.passEventPage = this.passEventPage.bind(this);
    }
    componentDidMount(): void {
        getinfo().then((content)=>this.setState({role:content.data})).catch(()=> console.log("failure to load role"));
    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if(this.state.id != this.props.id){
            this.setState({id: this.props.id});
        }
    }

    passEventId = () => {
        let eventId = this.state.id;
        this.props.setEventID(eventId);
    }
    passEventPage = () => {
        let eventPage = this.state.page;
        this.props.setEventPage(eventPage);
    }

    render() {
        return (
            <div className='box'>
                <button className='descriptionButton' type="submit" onClick={this.passEventId}>Event Description</button>
                <h1 className='title'>
                    Title: {this.props.title}
                </h1>

                <h4>
                    Host: {this.props.host} 
                </h4>

                <h4>
                    Date: {this.props.date}
                </h4>
            </div>
        )
    }
}

export default DashboardBox;