import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import "./EventEditingPage.css";
import EventEditingPagetmp from './EventEditingPagetmp';

  
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
          alert("Confirmation: your changes have beendddd saved")
          navigate("/EventDescriptionPage")
        }
      }
    })
    return(
      <EventEditingPagetmp formik={formik} eventNum={props.eventNum} navigate={navigate}/>
    )
}
  
export default EventEditingPage;