import EventDescriptionPage from "./EventDescriptionPage";
import Modal from "./Modal";
import useModal from "./UseModal";

function RsvpPage(){
    const { isOpen, toggle } = useModal();
    return (
      <EventDescriptionPage/>
      // <div>
      //   <button onClick={toggle}>Open Modal </button>
      //   <Modal isOpen={isOpen} toggle={toggle}></Modal>
      // </div>
      );
    }
export default RsvpPage;