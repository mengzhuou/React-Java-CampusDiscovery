import React, { Component } from 'react';
import "./HostManagementPage.css";
import { useFormik, Field, FieldProps } from 'formik';
import 'react-css-dropdown/dist/index.css';
import { emailValidator } from '../helpers/emailValidator';
import HostManagementPagetmp from './HostManagementPagetmp';
import { hostInvite } from '../helpers/connector';


function HostManagementPage(props:any){


    const [value, setValue] = React.useState('12');

    const handleChange = (event:any) => {
      setValue(event.target.value);
    }
    return(
      <HostManagementPagetmp handleChange={handleChange} eventNum={props.eventNum}/>
    )
}

export default HostManagementPage;