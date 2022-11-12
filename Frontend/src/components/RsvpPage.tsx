import EventDescriptionPage from "./EventDescriptionPage";
import Modal from "./Modal";
import useModal from "./UseModal";

function RsvpPage(){
    const { isOpen, toggle } = useModal();
    return (
      <div>
        <button className='button' onClick={toggle}> RSVP </button>
        <Modal isOpen={isOpen} toggle={toggle}></Modal>
        {/* <EventDescriptionPage/> */}
        
      </div>
      );
    }
export default RsvpPage;