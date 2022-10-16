import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./SignUpPage.css";
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';


function SignUpPage() {

  const formik = useFormik({
    initialValues:{
      firstName:'',
      lastName:'',
      email:'',
      password:''
    },
    
    onSubmit: values=>{
      alert(JSON.stringify(values, null,2))
    }
  });

  const options = [
    // value is the real value we get passed down
    {label: 'Student', value: 'Student'},
    {label: 'Teacher', value: 'Teacher'},
    {label: 'Organizer', value: 'Organizer'},
  ];
  
  const [value, setValue] = React.useState('Student');

  const handleChange = (event:any) => {
    setValue(event.target.value);
  };

  return (
    <div className="App">
      <Link to="/" className="welcomeLink">Welcome Page</Link>
      <header className="SignUp-header">
        <p>Please type your information below and submit the form.</p>
      </header>
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="hasMargin">
          <label htmlFor='firstName'>First Name : </label>
          <input onChange={formik.handleChange} value={formik.values.firstName} id='firstName' name='firstName'></input>
          {formik.errors.firstName ? <div>{formik.errors.firstName}</div>: null}
        </div>
        <div className="hasMargin">
          <label htmlFor='lastName'>Last Name : </label>
          <input onChange={formik.handleChange} value={formik.values.lastName} id='lastName' name='lastName'></input>
          {formik.errors.lastName ? <div>{formik.errors.lastName}</div>: null}
        </div>
        <div className="hasMargin">
          <label htmlFor='email'>Email Address (Username) : </label>
          <input onChange={formik.handleChange} value={formik.values.email} id='email' name='email'></input>
          {formik.errors.email ? <div>{formik.errors.email}</div>: null}
        </div>
        <div className="hasMargin">
          <label htmlFor='password'>Password : </label>
          <input onChange={formik.handleChange} value={formik.values.password} id='password' name='password'></input>
          {formik.errors.password ? <div>{formik.errors.password}</div>: null}
        </div>
        <div >
          <label htmlFor='Category'>Category : </label>
            <select value={value} onChange={handleChange}>
              {options.map((option) => 
                <option value={option.value}>{option.label}</option>
              )}
            </select>
        </div>
        {/* <p>Cate is {value}</p> */}
        <div >
          <button className="RegisterButton" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
  
export default SignUpPage;