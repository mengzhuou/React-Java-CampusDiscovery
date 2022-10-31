import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import "./EventCreationPage.css";
  
function EventEditingPage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
      title:'',
      host:'',
      date:'',
      location:'',
      description:'',
    },
    onSubmit: values=>{
        var textContent:string = "Event title: " + values.title + "\nEvent host: " + values.host + "\nEvent date: ";
        textContent += values.date + "\nEvent location: " + values.location + "\nEvent description: " + values.description;
        if(window.confirm(textContent)){
            alert("Confirmation: your changes have been saved")
            navigate("/dashboard")
        }
      }
    })

    const goBacktoDashBoard=() =>{
      navigate("/dashboard")
    }

    return (
        <div className = "App">
            <header className="App-header">
            <p>Event Creation</p>
            
        <form className="loginForm" onSubmit={formik.handleSubmit}>
            <div className="title">
            <label htmlFor='title'>Event title : </label>
            <input size={54.5} onChange={formik.handleChange} value={formik.values.title} id='title' name='title'></input>
            </div>

            <div className="host">
            <label htmlFor ='host'>Event host : </label>
            <input size={55} onChange={formik.handleChange} value = {formik.values.host} id='host' name='host'></input>
            </div>

            <div className="date">
            <label htmlFor ='date'>Event date : </label>
            <input size={55} onChange={formik.handleChange} value = {formik.values.date} id='date' name='date'></input>
            </div>

            <div className="location">
            <label htmlFor ='location'>Event location : </label>
            <input size={51} onChange={formik.handleChange} value = {formik.values.location} id='location' name='location'></input>
            </div>

            <div className="description">
            <label htmlFor ='description'>Event description : </label>
            <input size={48} onChange={formik.handleChange} value = {formik.values.description} id='description' name='description'></input>
            </div>

            <button className="button" type="submit">Create Event</button>
            <p className='text'> Want to go back to the dashboard?</p>
            <button className="button" onClick={goBacktoDashBoard}>Go Back</button>
        </form>
        </header>
        </div>
        
    );
}
  
export default EventEditingPage;