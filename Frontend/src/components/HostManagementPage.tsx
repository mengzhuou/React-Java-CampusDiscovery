import React, { Component } from 'react';
import "./HostManagementPage.css";
import { useFormik, Field, FieldProps } from 'formik';
import 'react-css-dropdown/dist/index.css';
import { emailValidator } from '../helpers/emailValidator';
import HostManagementPagetmp from './HostManagementPagetmp';
import { hostInvite } from '../helpers/connector';


function HostManagementPage(props:any){

    const formik = useFormik({
        initialValues:{
          email:''
        },
        onSubmit: (values,actions) =>{
            var text:string = "email = "+ values.email;
            if (window.confirm(text)){
                const emailError = emailValidator(values.email)
                if (emailError) {
                    alert("invalid email")
                    return
                }
                else{
                  hostInvite(props.eventNum(), values.email).then(()=>{
                    alert("You have added " + values.email + " to your event!")
                    actions.resetForm({
                        values:{
                            email:'',
                        },
                    });
                  }).catch(()=>(alert("invalid email2")))
                }
            }
        },
      });

      const [value, setValue] = React.useState('12');

      const handleChange = (event:any) => {
        setValue(event.target.value);
      }
      return(
        <HostManagementPagetmp formik={formik} handleChange={handleChange}/>
      )
}

export default HostManagementPage;