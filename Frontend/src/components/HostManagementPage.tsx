import React, { Component } from 'react';
import "./HostManagementPage.css";
import { useFormik, Field, FieldProps } from 'formik';
import 'react-css-dropdown/dist/index.css'
import { emailValidator } from '../helpers/emailValidator'
import HostManagementPagetmp from './HostManagementPagetmp';


function HostManagementPage(){

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
                    actions.resetForm({
                        values:{
                            email:'',
                        },
                    });
                }
                
                
                // else{
                //     values.email = ' ';
                // }
                // else{
                //     checkEmail(values.email).then(()=>{
                //       console.log("You have invited the person")
                //     }).catch(()=>{
                //       alert("Error email")
                //     })

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