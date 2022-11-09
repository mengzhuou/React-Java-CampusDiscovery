import { Link, useNavigate } from 'react-router-dom';
import React, { Component } from 'react';
import { useFormik } from 'formik';
import { addRsvp } from '../helpers/connector';
import Modal from "./Modal";
import useModal from "./UseModal";

function RsvpPage(){
    const { isOpen, toggle } = useModal();
    return (
      <div>
        <button onClick={toggle}>Open Modal </button>
        <Modal isOpen={isOpen} toggle={toggle}></Modal>
      </div>
    );
}
export default RsvpPage;