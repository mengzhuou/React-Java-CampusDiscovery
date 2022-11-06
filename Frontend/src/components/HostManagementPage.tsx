import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import "./HostManagementPage.css";
import { getinfo, getevent } from '../helpers/connector';
import { Formik, Field, FieldProps } from 'formik';
import Dropdown from 'react-dropdown'
import 'react-css-dropdown/dist/index.css'


const formik = () => (
    <Formik
        initialValues={{
            status: ""
        }}
        onSubmit={(values) => console.log(values)}
    >
        {({ values, setFieldValue }) => (
            <div>
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

    placeholder="Select a Status"
    options = [
        {label: 'Will Attend', value: 'WILLATTEND'},
        {label: 'Maybe', value: 'MAYBE'},
        {label: 'Will Not Attend', value: 'WONTATTEND'},
        {label: 'Nemesis', value: 'NEMESIS'},
        {label: 'Invited', value: 'INVITED'}
    ];

    defaultOption = this.options[2];


    render(){
        return (
            <div className='App'>
                <header>
                    <h1>Host Management</h1>
                    <h4 className='statusLine'>Choose Status : </h4>
                    <Dropdown className="dropdownStatus"
                        options={this.options}
                        // onChange={this._onSelect}
                        value={this.defaultOption}
                        placeholder="Select"
                    />
                </header>
                <body>
                    <button className="button">X</button>
                    <button className="button">Add/Invite</button>
                    <Link to = "/EventDescriptionPage">
                        <button className="button">Description</button>
                    </Link>
                    <Link to = "/EventEditingPage">
                        <button className="button">Edit Your Event</button>
                    </Link>
                    {/* to delete attendee. */}

                </body>
            </div>
            


        );
    }
}

export default HostManagementPage;