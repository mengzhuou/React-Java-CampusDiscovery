import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import "./LoginPage.css";
  
function LoginPage() {

  const formik = useFormik({
    initialValues:{
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
        <div className="email">
          <label htmlFor='email'>Your email : </label>
          <input onChange={formik.handleChange} value={formik.values.email} id='email' name='email'></input>
          {formik.errors.email ? <div>{formik.errors.email}</div>: null}
        </div>
        <div className="password">
          <label htmlFor ='password'>Password : </label>
          <input onChange={formik.handleChange} value = {formik.values.password} id='password' name='password'></input>
          {formik.errors.password ? <div>{formik.errors.password}</div>: null}
        </div>
        <button className="button" type="submit">Login</button>
        <p>Or don't have an account?</p>
        <Link to = "/first" className = "button">
          <button className="button" type="submit">Sign up</button>
          </Link>
      </form>
      </header>
    </div>
    
  );
}
  
export default LoginPage;