import React from 'react';
import InfoCard from './InfoCard';
import clock from '../../assets/icons/clock.svg'
import marker from '../../assets/icons/marker.svg'
import phone from '../../assets/icons/phone.svg'

const Info = () => {
    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-5 justify-center'>
            <InfoCard CardTitle={'Opening Hours'} des={'Lorem Ipsum is simply dummy text of the pri'} img={clock} bg={'bg-gradient-to-r from-primary to-secondary'}></InfoCard>
            <InfoCard CardTitle={'Visit our location'} des={'Brooklyn, NY 10036, United States'} img={marker} bg={'bg-accent'}></InfoCard>
            <InfoCard CardTitle={'Contact us now'} des={'+000 123 456789'} img={phone} bg={'bg-gradient-to-r from-primary to-secondary'}></InfoCard>
        </div>
    );
};

export default Info;