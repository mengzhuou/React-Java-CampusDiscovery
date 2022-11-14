import "./Dashboard.css";
import "./EventDescriptionPage.css";
import "./RsvpPage.css";
import React from 'react';
import { updateRsvp } from '../helpers/connector';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

function RsvpPage(props:any){
    const navigate = useNavigate();
    const options = [
      // value is the real value we get passed down
      {label: 'Will Attend', value: 'WILLATTEND'},
      {label: 'Maybe', value: 'MAYBE'},
      {label: 'Will not Attend', value: 'WONTATTEND'},
      {label: 'Nemesis', value: 'NEMESIS'},
      {label: 'Invited', value: 'INVITED'},
      {label: 'Delete', value: 'DELETE'},
    ];
    
    const [value, setValue] = React.useState('WILLATTEND');
  
    const handleChange = (event:any) => {
      setValue(event.target.value);
    };

    const handleConfirm = ()=>{
      if(window.confirm("Are you Sure?")){
        updateRsvp(props.eventNum(), value).then(()=>{
          alert("Successful Update!");
          navigate("/EventDescriptionPage")
        }).catch(()=>console.log("Failed to Update RSVP"));
      }
    };

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
          <button className='button' onClick={handleConfirm}> Confirm </button>
          <Link to = "/EventDescriptionPage">
            <button className='button' > Cancel </button>
          </Link>
          </div>
        </body>
        
        {/* <EventDescriptionPage/> */}
        
      </div>
      );
    }
export default RsvpPage;