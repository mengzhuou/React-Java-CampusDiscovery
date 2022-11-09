import { Link } from 'react-router-dom';
import "./EventDescriptionPage.css";
import "./Dashboard.css";
import Modal from "./Modal";
import useModal from "./UseModal";
  
function EventDescriptionPage(props: any) {
  const { isOpen, toggle } = useModal();
  
  return (
    <div className = "App">
      <header className="App-header">
        <p>Event Description</p>
        <form className="eventDescriptionForm">
            <div className="desName">
              {/* <button onClick={()=>alert(props.eventNum())}>Event Number</button> */}
              <label htmlFor='title'>Event title :</label>
            </div>

            <div className="desName">
              <label htmlFor ='host'>Event host : </label>
            </div>

            <div className="desName">
              <label htmlFor ='date'>Event date : </label>
            </div>

            <div className="desName">
              <label htmlFor ='location'>Event location : </label>
            </div>

            <div className="desName">
              <label htmlFor ='description'>Event description : </label>
            </div>

            <div className="desName">
              <p>Your RSVP Status: </p>
            </div>
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