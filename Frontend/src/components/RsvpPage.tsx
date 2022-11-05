import { Link, useNavigate } from 'react-router-dom';
import React, { Component } from 'react';
import { useFormik } from 'formik';
import { addRsvp } from '../helpers/connector';


function RsvpPage(){
    // const navigate = useNavigate();
    // const formik = useFormik({
    //     initialValues:{
    //         status:'will-attend',
    //     },

    //     onSubmit: values=>{
    //         var text:string = "status = " + values.status;
    //         // addRsvp(values.email, values.status).catch(()=>{
    //         //     alert("error1")
    //         // })
    //     }
    // })
    return(
        <div></div>
    );
}
export default RsvpPage;