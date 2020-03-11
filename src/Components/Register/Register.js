import React from 'react';
import RegisterPatient from './RegisterPatient';
import RegisterTherapist from './RegisterTherapist';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Link } from 'react-router-dom';

function Register(props){

    const withLanding = (
    <div className='register on-landing'>
        <Tabs defaultActiveKey='client' id='register-tabs'>
            <Tab eventKey='client' title='Client'>
                <RegisterPatient />
            </Tab>
            <Tab eventKey='therapist' title='Therapist'>
                <RegisterTherapist />
            </Tab>
        </Tabs>
        <span className='block pad-top-25'>We will get more detials later. For now let's just get the basics.</span>
        <span className='block pad-top-25'>
            Already have an account?&nbsp;
            <Link
                to='/login'
            >
                Click here&nbsp;
            </Link> 
            to log in.
        </span>
    </div>)

const withoutLanding = ( 
    <div className='register bg-cover height-100-vh-calc bg-face'>
        <div className='overlay light'></div>
        <div className='wrap row justify-center align-items-middle z-index-2 height-100-p'>
            <div className='col col-sm-12 col-md-5 bg-white block login-wrap pad-55 text-center'>
                <Tabs defaultActiveKey='client' id='register-tabs'>
                    <Tab eventKey='client' title='Client'>
                        <RegisterPatient />
                    </Tab>
                    <Tab eventKey='therapist' title='Therapist'>
                        <RegisterTherapist />
                    </Tab>
                </Tabs>
                <span className='block pad-top-25'>We will get more detials later. For now let's just get the basics.</span>
                <span className='block pad-top-25'>
                    Already have an account?&nbsp;
                    <Link
                        to='/login'
                    >
                        Click here&nbsp;
                    </Link> 
                    to log in.
                </span>
            </div>
        </div>
    </div>)

    return(
        props.landing ? withLanding : withoutLanding
    );
}


export default Register;