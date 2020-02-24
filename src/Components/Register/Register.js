import React from 'react';
import RegisterPatient from './RegisterPatient';
import RegisterTherapist from './RegisterTherapist';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Link } from 'react-router-dom';

function Register(){

    return(
        <div className='wrap register'>
            <h1>Register</h1>
            <Tabs defaultActiveKey='client' id='register-tabs'>
                <Tab eventKey='client' title='Client'>
                    <RegisterPatient />
                </Tab>
                <Tab eventKey='therapist' title='Therapist'>
                    <RegisterTherapist />
                </Tab>
            </Tabs>
            <span>
                Already have an account?&nbsp;
                <Link
                    to='/login'
                >
                    Click here&nbsp;
                </Link> 
                to log in.
            </span>
        </div>
    );
}


export default Register;