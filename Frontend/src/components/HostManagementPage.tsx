import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import "./HostManagementPage.css";
import { getinfo, getevent } from '../helpers/connector';
import DashboardBox from './DashboardBox';
import { Formik, Field, FieldProps } from 'formik';
import { Dropdown } from "semantic-ui-react"

const formik = () => (
    <Formik
        initialValues={{
            status: ""
        }}
        onSubmit={(values) => console.log(values)}
    >
        {({ values, setFieldValue }) => (
            <div>
                <pre>{JSON.stringify(values, undefined, 2)}</pre>

                <Dropdown
                    selection
                    placeholder="Select a Status"
                    options = {[
                        {label: 'Will Attend', value: 'WILLATTEND'},
                        {label: 'Maybe', value: 'MAYBE'},
                        {label: 'Wont Attend', value: 'WONTATTEND'},
                        {label: 'Nemesis', value: 'NEMESIS'},
                        {label: 'Invited', value: 'INVITED'}
                    ]}
                    value={values.status}
                    onChange={(_, { value }) => setFieldValue("status", value)}
                />
                <div>{values.status}</div>
            </div>
        )}
    </Formik>
)

class HostManagementPage extends Component<any,any> {

    
    constructor(props:any){
        super(props);
        this.forceup = this.forceup.bind(this);
    }

    async forceup() {
        this.setState({ForceUpdateNow:true});
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if(this.state.ForceUpdateNow){
            getevent(this.state.currentPage).then((content)=>{
                let key;
                let array = [];
                for(key in content.data){
                    array.push([content.data[key].email])
                }
                this.setState({arr:array});
                this.forceUpdate();
            })
            this.setState({ForceUpdateNow:false});
        }
    }

    render(){
        // let dasharr: any[] = [];
        // for(let i = 0; i < this.state.arr.length; i++){
        //     dasharr.push(<DashboardBox
        //         attendee={this.state.arr[i][0]}
        //         update={this.forceup}
        //     />);
        // }

        return (
            <div className='App'>
                <p>Host Management</p>
                <Link to = "/EventDescriptionPage">
                    <button className="button">Description</button>
                </Link>
                <Link to = "/EventEditingPage">
                    <button className="button">Edit Your Event</button>
                </Link>
                {/* to delete attendee. */}
                <button className="button">X</button>
                <button className="button">Add/Invite</button>
            </div>
            


        );
    }
}

export default HostManagementPage;