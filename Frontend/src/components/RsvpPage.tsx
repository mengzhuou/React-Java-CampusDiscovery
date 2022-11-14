import EventDescriptionPage from "./EventDescriptionPage";
import Modal from "./Modal";
import useModal from "./UseModal";
import "./Dashboard.css";
import "./EventDescriptionPage.css";
import "./RsvpPage.css";
import React from 'react';
import { geteventbyid, getRsvp } from '../helpers/connector';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

function RsvpPage(){
    const { isOpen, toggle } = useModal();
    const options = [
      // value is the real value we get passed down
      {label: 'Will Attend', value: 'Will Attend'},
      {label: 'Maybe', value: 'Maybe'},
      {label: 'Will not Attend', value: 'Will not Attend'},
    ];
    
    const [value, setValue] = React.useState('Student');
  
    const handleChange = (event:any) => {
      setValue(event.target.value);
    };

    const navigate = useNavigate();

    return (
      <div className = "App">
        <header className="App-header">
          <p>Ready for RSVP?</p>
        </header>

        <body className = "rsvpBox">
          <div className = "para">
            <p>Select your RSVP status</p>
          </div>
          <div className = "para1">
            <label htmlFor='Category'> Status : </label>
            <select value={value} onChange={handleChange}>
              {options.map((option) => 
                <option value={option.value}>{option.label}</option>
              )}
            </select>
          </div>

          <div className = "rsvpButton">
          <Link to = "/EventDescriptionPage">
            <button className='button' onClick={toggle} > Confirm </button>
          </Link>
          <Link to = "/EventDescriptionPage">
            <button className='button' onClick={toggle}> Cancel </button>
          </Link>
          </div>
        </body>
        
        {/* <EventDescriptionPage/> */}
        
      </div>
      );
    }
export default RsvpPage;