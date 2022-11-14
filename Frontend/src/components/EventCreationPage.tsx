import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import "./EventCreationPage.css";
import { addevent } from '../helpers/connector'


  
function EventCreationPage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
      title:'',
      time:'',  //date
      location:'',
      description:'',
    },
    onSubmit: values=>{
        var textContent:string = "Event title: " + values.title + "\nEvent date: ";
        textContent += values.time + "\nEvent location: " + values.location + "\nEvent description: " + values.description;
        if(window.confirm(textContent)){
          addevent(values.title, values.time, values.location, values.description).then(()=>{
            alert("Confirmation: your changes have been saved")
            navigate("/dashboard")
          }).catch(()=>console.log("failed"))
        }
      }
    })

    return (
        <div className = "App">
            <header className="App-header">
            <p>Event Creation</p>
          </header>
          <form className="eventCreationForm" onSubmit={formik.handleSubmit}>
              <div className="text">
              <label htmlFor='title'>Event title : </label>
              <input size={54.5} onChange={formik.handleChange} value={formik.values.title} id='title' name='title'></input>
              </div>

              <div className="text">
              <label htmlFor ='date'>Event date : </label>
              <input size={55} onChange={formik.handleChange} value = {formik.values.time} id='time' name='time'></input>
              </div>

              <div className="text">
              <label htmlFor ='location'>Event location : </label>
              <input size={51} onChange={formik.handleChange} value = {formik.values.location} id='location' name='location'></input>
              </div>

              <div className="text">
              <label htmlFor ='description'>Event description : </label>
              <input size={48} onChange={formik.handleChange} value = {formik.values.description} id='description' name='description'></input>
              </div>

              <div className="text">
              <label htmlFor ='capacity'>Event Capacity : </label>
              <input size={48} onChange={formik.handleChange} value = {formik.values.description} id='description' name='description'></input>
              </div>
              <button className="button" type="submit">Create Event</button>


              <button className="button" type="submit">Create Event</button>

              


          </form>
          <div className='bottomnav'>
              <Link to = "/Dashboard">
                  <button className="buttomnavButton">Dashboard</button>
              </Link>
          </div>
        </div>
    );
}
  
export default EventCreationPage;