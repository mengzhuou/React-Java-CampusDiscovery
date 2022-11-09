import { Link } from 'react-router-dom';
import "./EventDescriptionPage.css";
import "./Dashboard.css";
import Modal from "./Modal";
import useModal from "./UseModal";
import { useNavigate } from 'react-router-dom';

  
function EventDescriptionPage() {
  const navigate = useNavigate();

  const rsvpNavigate = () => {
    navigate('/RsvpPage');
  }

  const { isOpen, toggle } = useModal();
  
  return (
    <div className = "App">
      <header className="App-header">
      {/* this page should only contain event information, so no input box */}
        <p>Event Description</p>
        <form className="eventDescriptionForm">
            <div className="desName">
              <label htmlFor='title'>Event title :</label>
              {/* <input size={54.5} onChange={formik.handleChange} value={formik.values.title} id='title' name='title'></input> */}
            </div>

            <div className="desName">
              <label htmlFor ='host'>Event host : </label>
              {/* <input size={55} onChange={formik.handleChange} value = {formik.values.email} id='email' name='email'></input> */}
            </div>

            <div className="desName">
              <label htmlFor ='date'>Event date : </label>
              {/* <input size={55} onChange={formik.handleChange} value = {formik.values.time} id='time' name='date'></input> */}
            </div>

            <div className="desName">
              <label htmlFor ='location'>Event location : </label>
              {/* <input size={51} onChange={formik.handleChange} value = {formik.values.location} id='location' name='location'></input> */}
            </div>

            <div className="desName">
              <label htmlFor ='description'>Event description : </label>
              {/* <input size={48} onChange={formik.handleChange} value = {formik.values.description} id='description' name='description'></input> */}
            </div>

            <div className="desName">
              <p>Your RSVP Status: </p>
            </div>

         
            <button className='button' onClick={rsvpNavigate}> RSVPworks </button>
            <Link to = "/AttendeeListPage">
              <button className="button">Attendee List</button>
            </Link>
            <Link to = "/HostManagementPage">
              <button className="button">Host Management</button>
            </Link>
            <Link to = "/Dashboard">
                <button className="button">Dashboard</button>
            </Link>
        </form>
        <button className='button' onClick={toggle}> RSVP </button>
        <Modal isOpen={isOpen} toggle={toggle}></Modal>
      </header>
    </div>
  );
}

export default EventDescriptionPage;