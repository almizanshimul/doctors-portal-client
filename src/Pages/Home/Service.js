import React from 'react';
import ServiceCard from './ServiceCard';
import cavity from '../../assets/images/cavity.png'
import fluoride from '../../assets/images/fluoride.png'
import whitening from '../../assets/images/whitening.png'

const Service = () => {
    return (
        <div className='text-center py-20'>
            <h4 className='text-primary text-xl'>OUR SERVICES</h4>
            <p className='text-dark text-5xl font-bold'>Services We Provide</p>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-5 justify-center'>
                <ServiceCard cardTitle={'Fluoride Treatment'} cardDes={'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the'} img={fluoride}></ServiceCard>
                <ServiceCard cardTitle={'Cavity Filling'} cardDes={'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the'} img={cavity}></ServiceCard>
                <ServiceCard cardTitle={'Teeth Whitening'} cardDes={'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the'} img={whitening}></ServiceCard>
            </div>
        </div>
    );
};

export default Service;