import * as React from 'react';
import { Link } from 'react-router-dom';
import "./SignUpPage.css";
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';


function SignUpPage() {

  // const validate = values =>{
  //   const errors = {}
  //   if (!values.firstName){
  //     errors.firstName = 'Required'
  //   }
  //   else if (values.firstName.length > 30){
  //     errors.firstName = 'Please make sure the length is no larger than 30 characters'
  //   }

  //   if (!values.lastName){
  //     errors.lastName = 'Required'
  //   }
  //   else if (values.lastName.length > 30){
  //     errors.lastName = 'Please make sure the length is no larger than 30 characters'
  //   }

  //   if (!values.email){
  //     errors.email = 'Required'
  //   }
  //   else if (values.email.length > 30){
  //     errors.email = 'Please make sure the length is no larger than 30 characters'
  //   }

  //   return errors
  // }

  const formik = useFormik({
    initialValues:{
      firstName:'',
      lastName:'',
      email:''
    },
    // validate,
    onSubmit: values=>{
      alert(JSON.stringify(values, null,2))
    }
  })

  const [value, setValue] = React.useState('Student');

  const handleChange = (event:any) => {
    setValue(event.target.value);
  };

  return (
    <div className="App">
      <Link to="/" className="welcomeLink">Welcome Page</Link>
      <header className="SignUp-header">
        <p>Please type your information below and submit the form.</p>
        {/* First Name, Last Name, Category (student, teacher, organizer) */}
      </header>
      <form className="form" onSubmit={formik.handleSubmit}>
        {/* <section className="section_SignUp">
          <div className="textfield_first">
            <TextField id="outlined-basic" label="First Name" variant="outlined" />
          </div>
          <div className="textfield_second">
            <TextField id="outlined-basic" label="Last Name" variant="outlined" />
          </div>
        </section> */}
        <div className="firstName">
          <label htmlFor='firstName'>First Name : </label>
          <input onChange={formik.handleChange} value={formik.values.firstName} id='firstName' name='firstName'></input>
          {formik.errors.firstName ? <div>{formik.errors.firstName}</div>: null}
        </div>
        <div className="lastName">
          <label htmlFor='lastName'>Last Name : </label>
          <input onChange={formik.handleChange} value={formik.values.lastName} id='lastName' name='lastName'></input>
          {formik.errors.lastName ? <div>{formik.errors.lastName}</div>: null}
        </div>
        <div className="email">
          <label htmlFor='email'>Email Address : </label>
          <input onChange={formik.handleChange} value={formik.values.email} id='email' name='email'></input>
          {formik.errors.email ? <div>{formik.errors.email}</div>: null}
        </div>
        <div>
          <label htmlFor='Category'>Category : </label>
            <select value={value} onChange={handleChange}>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Organizer">Organizer</option>
            </select>
            
        </div>
        
        <p>Cate is {value}</p>
        <div >
          <button className="RegisterButton" type="submit">Register</button>

        </div>
      </form>
      {/* <div>
        <MyForm onSubmit={() => {}}/>
      </div> */}

  

     
    </div>
  );
}
  
export default SignUpPage;