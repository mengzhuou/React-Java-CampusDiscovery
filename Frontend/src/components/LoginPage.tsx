import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import "./LoginPage.css";
  
function LoginPage() {

  const formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:''
    },
    onSubmit: values=>{
      alert(JSON.stringify(values, null,2))
    }
  })


  return (
    <div className = "App">
      <Link to = "/" className = "welcomeLink"> Welcome Page</Link>
      <header className = "LoginPage-header">
      <form className="loginForm" onSubmit={formik.handleSubmit}>
        <div className="loginName">
          <label htmlFor='loginName'>Your name : </label>
          <input onChange={formik.handleChange} value={formik.values.name} id='loginName' name='loginName'></input>
          {formik.errors.name ? <div>{formik.errors.name}</div>: null}
        </div>
        <div className="loginEmail">
          <label htmlFor='loginEmail'>Your email : </label>
          <input onChange={formik.handleChange} value={formik.values.email} id='loginEmail' name='loginEmail'></input>
          {formik.errors.email ? <div>{formik.errors.email}</div>: null}
        </div>
        <div className="loginPassword">
          <label htmlFor ='loginPassword'>Password : </label>
          <input onChange={formik.handleChange} value = {formik.values.password} id='loginPassword' name='loginPassword'></input>
          {formik.errors.password ? <div>{formik.errors.password}</div>: null}
        </div>
        <div className="loginButton">
          <button className="LoginButton" type="submit">Login</button>
        </div>
        <p>Or don't have an account?</p>
        <div className="SignupButton">
          <Link to = "/first" className = "SignUpPage">
          <button className="SignupButton" type="submit">Sign up</button>
          </Link>
        </div>
      </form>
      </header>
    </div>
    
  );
}
  
export default LoginPage;