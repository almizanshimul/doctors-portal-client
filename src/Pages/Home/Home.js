import React from 'react';
import Appointment from './Appointment';
import Banner from './Banner';
import ExpectationalDental from './ExpectationalDental';
import Info from './Info';
import Service from './Service';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div className='max-w-screen-max-con'>
            <Banner></Banner>
            <Info></Info>
            <Service></Service>
            <ExpectationalDental></ExpectationalDental>
            <Appointment></Appointment>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;