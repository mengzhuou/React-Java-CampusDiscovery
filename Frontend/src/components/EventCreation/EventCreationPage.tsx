import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import "./EventCreationPage.css";
import { addevent } from '../../helpers/connector';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css'
import moment from 'moment';
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { withFuncProps } from '../withFuncProps';

function EventCreationPage(props:any) {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
      title:'',
      time:'',  //date
      location:'',
      description:'',
      capacity:'',
      inviteonly: false,
    },
    onSubmit: values=>{
        var textContent:string = "Event title: " + values.title + "\nEvent date: ";
        textContent += dateResult + timeResult + "\nEvent location: " + values.location + 
                      "\nEvent description: " + values.description + "\nEvent Capacity: " + values.capacity + "\nEvent Invite-Only: " + values.inviteonly;
        if(window.confirm(textContent)){
          addevent(values.title, values.description, values.location, longitude , latitude, dateResult + timeResult, (values.inviteonly?"true":"false"), values.capacity).then(()=>{
            alert("Confirmation: your changes have been saved")
            navigate("/dashboard")
          }).catch(()=>console.log("failed"))
        }
      }
    })  

    const [date, setDate] = useState("");
    const [latitude, setLatitude] = useState("-1");
    const [longitude, setLongitude] = useState("-1");
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>();
    const dateResult = JSON.stringify(date).substring(1,11);

    const TimeZone = (new Date()).getTimezoneOffset;
    const [ timeValue, setTimeValue ] = useState(moment(0).utcOffset(TimeZone.toString()));
    const timeResult = JSON.stringify(timeValue).substring(11,20);

    const onPlaceChanged = ()=>{
      if(autocomplete !== undefined && autocomplete?.getPlace() !== undefined && autocomplete?.getPlace().geometry !== undefined &&
       autocomplete?.getPlace().geometry !== undefined && autocomplete?.getPlace().geometry?.location !== undefined){
        let tmp = autocomplete?.getPlace().geometry?.location;
        let addrtmp = autocomplete.getPlace().address_components
        var addy = '';
        if(addrtmp){
          addy = [
            ((addrtmp[0] && addrtmp[0].short_name) || ''),
            ((addrtmp[1] && addrtmp[1].short_name) || ''),
            ((addrtmp[2] && addrtmp[2].short_name) || '')
        ].join(' ');
        }
        if(tmp !== undefined && addy !== undefined){
          setLatitude(tmp["lat"]().toString());
          setLongitude(tmp["lng"]().toString());
          formik.setFieldValue("location", addy)
        }
      }
    }

    return props.isLoaded? (
        <div className = "App">
            <header className="App-header">
            <p>Event Creation</p>
          </header>
          <form className="eventCreationForm" onSubmit={formik.handleSubmit}>
              <div className="text">
                <label htmlFor='title'>Event title : </label>
                <input size={54.5} onChange={formik.handleChange} value={formik.values.title} id='title' name='title'></input>
              </div>

              <div className="text" >
                <div className='datetime'>
                  <label htmlFor='date'>Event date : </label>
                </div>
                <div className='datetime'>
                  <DatePicker
                    dateFormat="yyyy-MM-dd"
                    selected={date}
                    
                    onChange={setDate}
                  />
                </div>
                <div className='datetime'>
                  <TimePicker
                    format='HH:mm'
                    value={timeValue}
                    onChange={setTimeValue}
                    placeholder="00:00"
                    showSecond={false}
                  />
                </div>

              </div>

              <div className="text">
                <label htmlFor ='location'>Event location : </label>
                <Autocomplete
                  onLoad={(autocomplete:google.maps.places.Autocomplete)=>setAutocomplete(autocomplete)}
                  onPlaceChanged={onPlaceChanged}
                >
                <input size={51} onChange={formik.handleChange} value = {formik.values.location} id='location' name='location'></input>
                </Autocomplete>
              </div>


              <div className="text">
                <label htmlFor ='description'>Event description : </label>
                <input size={48} onChange={formik.handleChange} value = {formik.values.description} id='description' name='description'></input>
              </div>

              <div className="text">
                <label htmlFor ='capacity'>Event Capacity : </label>
                <input size={48} onChange={formik.handleChange} value = {formik.values.capacity} id='capacity' name='capacity'></input>
              </div>
             
              <div className = "text">
                <label>
                  <input size={48} type="checkbox" onChange={formik.handleChange} id='inviteonly' name = 'inviteonly'/>
                     Invite Only
                </label>
              </div>


              <button className="button" type="submit">Create Event</button>

              


          </form>
          <div className='bottomnav'>
              <Link to = "/Dashboard">
                  <button className="buttomnavButton">Dashboard</button>
              </Link>
          </div>
        </div>
    ) : <></> ;
}
  
export default withFuncProps(EventCreationPage);
