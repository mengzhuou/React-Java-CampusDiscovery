import React, { Component } from 'react';
import { getinfo, updatedescription, updatedescriptionadmin, 
    updatelocation, updatelocationadmin, updatetime, 
    updatetimeadmin, updatetitle, updatetitleadmin, updateEmailadmin } from '../helpers/connector'
import './DashboardBox.css'


class DashboardBox extends Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {id: this.props.id, role: "STUDENT"}
        this.updateTitle = this.updateTitle.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.updateTime = this.updateTime.bind(this);
    }
    componentDidMount(): void {
        getinfo().then((content)=>this.setState({role:content.data})).catch(()=> console.log("failure to load role"));
    }
    updateTitle(){
        let tmp = prompt('Update Title:');
        let conf = window.confirm('Confirm or deny');
        if(conf && tmp != null){
            if(this.state.role == "ADMIN"){
                updatetitleadmin(this.state.id, tmp).then(()=>{
                    alert("successful update");
                    this.props.update();
                }).catch(()=>alert("unsuc update"));
            }else{
                updatetitle(this.state.id, tmp).then(()=>{
                    alert("successful update");
                    this.props.update();
                }).catch(()=>alert("unsuc update"));
            }
            console.log(this.state.id, tmp)
        }
    }
    updateDescription(){
        let tmp = prompt('Update Description:');
        let conf = window.confirm('Confirm or deny');
        if(conf && tmp != null){
            if(this.state.role == "ADMIN"){
                updatedescriptionadmin(this.state.id, tmp).then(()=>{
                    alert("successful update");
                    this.props.update();
                }).catch(()=>alert("unsuc update"));
            }else{
                updatedescription(this.state.id, tmp).then(()=>{
                    alert("successful update");
                    this.props.update();
                }).catch(()=>alert("unsuc update"));
            }
            console.log(this.state.id, tmp)
        }
    }
    updateEmail(){
        let tmp = prompt('Update Host:');
        let conf = window.confirm('Confirm or deny');
        if(conf && tmp != null){
            if(this.state.role == "ADMIN"){
                updateEmailadmin(this.state.id, tmp).then(()=>{
                    alert("successful update");
                    this.props.update();
                }).catch(()=>alert("unsuc update"));
            }else{
                alert("only admin can change email");
            }
            console.log(this.state.id, tmp)
        }
    }
    updateLocation(){
        let tmp = prompt('Update Location:');
        let conf = window.confirm('Confirm or deny');
        if(conf && tmp != null){
            if(this.state.role == "ADMIN"){
                updatelocationadmin(this.state.id, tmp).then(()=>{
                    alert("successful update");
                    this.props.update();
                }).catch(()=>alert("unsuc update"));
            }else{
                updatelocation(this.state.id, tmp).then(()=>{
                    alert("successful update");
                    this.props.update();
                }).catch(()=>alert("unsuc update"));
            }
            console.log(this.state.id, tmp)
        }
    }
    updateTime(){
        let tmp = prompt('Update Date:');
        let conf = window.confirm('Confirm or deny');
        if(conf && tmp != null){
            if(this.state.role == "ADMIN"){
                updatetimeadmin(this.state.id, tmp).then(()=>{
                    alert("successful update");
                    this.props.update();
                }).catch(()=>alert("unsuc update"));
            }else{
                updatetime(this.state.id, tmp).then(()=>{
                    alert("successful update");
                    this.props.update();
                }).catch(()=>alert("unsuc update"));
            }
            console.log(this.state.id, tmp)
        }
    }

    render() {
        return (
        <div className='box'>
            <h1 className='title'>
                <button className="editButtonTitle" type="submit" onClick={this.updateTitle}>Edit</button> 
                Title: {this.props.title}
            </h1>

            <h4>
                <button className="editButton" type="submit" onClick={this.updateEmail}>Edit</button>
                Host: {this.props.host} 
            </h4>

            <h4>
                <button className="editButton" type="submit" onClick={this.updateTime}>Edit</button>
                Date: {this.props.date}
            </h4>

            <h4>
                <button className="editButton" type="submit" onClick={this.updateLocation}>Edit</button>
                Location: {this.props.location}
            </h4>

            <h4>
                <button className="editButton" type="submit" onClick={this.updateDescription}>Edit</button>
                Descripton: {this.props.description}
            </h4>
        </div>
        )
      }
}

export default DashboardBox;