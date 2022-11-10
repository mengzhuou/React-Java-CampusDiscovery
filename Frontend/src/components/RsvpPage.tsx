import EventDescriptionPage from "./EventDescriptionPage";
import Modal from "./Modal";
import useModal from "./UseModal";

function RsvpPage(){
    const { isOpen, toggle } = useModal();
    return (
      <div>
        <EventDescriptionPage/>
      </div>
      );
    }
export default RsvpPage;