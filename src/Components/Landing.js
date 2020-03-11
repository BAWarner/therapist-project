import React, { Component } from 'react';

class Landing extends Component{
    render(){
        return(
            <section>
                <div className='bg-light-gray'>
                    <div className='wrap'>
                        <h3 className='text-center no-mrg pad-top-25 pad-btm-25'>Built with clients and therapists in mind</h3>
                    </div>
                </div>
                <div className='row align-items-middle justify-justified reverse-mobile mini-wrap'>
                    <div className='col-sm-12 col-md-6 bg-family bg-cover'>
                        <div className='overlay light'></div>
                    </div>
                    <div className='col-sm-12 col-md-6 pad-top-55 pad-btm-55'>
                        <h3 className='text-mobile-center'>Our Mission</h3>
                        <p className='text-mobile-center'>Mental health is key to happiness and overall well-being. We have made it our top priority to match you with highly-trained professionals, or clients that fit your training to eliminate the stress of de-stressing. Use the time you save here to focus on what you care about most.</p>
                    </div>
                </div>
                <div className='bg-light-gray pad-top-55 pad-btm-55'>
                    <div className='wrap'>
                        <div className='row align-items-center justify-center'>
                            <div className='col-sm-12 col-md-9 text-center'>
                                <p>
                                    Review therapist methods, specialties and even office amenities to find the perfect fit for you. With the capability to upload documents, images, and reading materials, getting started, reviewing sessions, and keeping in touch with each other is a breeze.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Landing;