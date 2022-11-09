import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import "./EventEditingPage.css";

  
function EventEditingPage(props: any) {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
      title:'',
      email:'', //host
      time:'',  //date
      location:'',
      description:'',
    },
    onSubmit: values=>{
        var textContent:string = "Event title: " + values.title + "\nEvent host (email): " + values.email + "\nEvent date: ";
        textContent += values.time + "\nEvent location: " + values.location + "\nEvent description: " + values.description;
        if(window.confirm(textContent)){
          alert("Confirmation: your changes have been saved")
          navigate("/EventDescriptionPage")
        }
      }
    })

    return (
      <div className = "App">
        <header className="App-header">
          <p>Edit Your Event<button onClick={()=>alert(props.eventNum())}>Event Number</button></p>
          <form className="eventEditingForm" onSubmit={formik.handleSubmit}>
              <div className="title">
                <label htmlFor='title'>Event title : </label>
                <input size={54.5} onChange={formik.handleChange} value={formik.values.title} id='title' name='title'></input>
              </div>

              <div className="host">
                <label htmlFor ='host'>Event host : </label>
                <input size={55} onChange={formik.handleChange} value = {formik.values.email} id='email' name='email'></input>
              </div>

              <div className="date">
                <label htmlFor ='date'>Event date : </label>
                <input size={55} onChange={formik.handleChange} value = {formik.values.time} id='time' name='date'></input>
              </div>

              <div className="location">
                <label htmlFor ='location'>Event location : </label>
                <input size={51} onChange={formik.handleChange} value = {formik.values.location} id='location' name='location'></input>
              </div>

              <div className="description">
                <label htmlFor ='description'>Event description : </label>
                <input size={48} onChange={formik.handleChange} value = {formik.values.description} id='description' name='description'></input>
              </div>
              <div>
                <button className='editSubmitButton' >Confirm Changes</button>
              </div>

              <Link to = "/HostManagementPage">
                <button className="button">Host Management</button>
              </Link>
              <Link to = "/Dashboard">
                  <button className="button">Dashboard</button>
              </Link>
          </form>
        </header>
      </div>
    );
}
  
export default EventEditingPage;