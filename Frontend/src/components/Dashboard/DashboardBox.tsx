import React, { Component } from 'react';
import { getinfo } from '../../helpers/connector'
import './DashboardBox.css'


class DashboardBox extends Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {id: this.props.id, role: "STUDENT"}
        this.passEventId = this.passEventId.bind(this);
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

    render() {
        const host : any[] = [];
        if(this.props.username === this.props.host){
            host.push(<p className='hostLabel'>Host</p>);
        }
        return (
            <div className='box'>
                <button className='descriptionButton' type="submit" onClick={this.passEventId}>Event Description</button>
                {host}
                <div className='DashboardTitle'>
                    {this.props.title}
                </div>
                <h4 className="DashboardElement">
                    Host : {this.props.host} 
                </h4>
                <h4 className="DashboardElement">
                    Date : {this.props.date[2] + "/" + this.props.date[1] + "/" + this.props.date[0] + " " + this.props.date[3] + ":" + ('0' + this.props.date[4]).slice(-2)   }
                </h4>
            </div>
        )
    }
}

export default DashboardBox;