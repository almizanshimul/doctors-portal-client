import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import chair from '../../assets/images/chair.png'

const AppointmentBanner = ({selected, setSelected}) => {
    return (
        <section className='flex justify-center items-center p-10  bg-[url("https://i.ibb.co/5j2zRq9/landing-bg.png")] py-20'>
            <div className='flex-1 '>
                <div className='rounded-md mx-auto bg-white drop-shadow-lg' style={{width:'fit-content'}}>
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                    />
                </div>
            </div>
            <div className='flex-1 hidden lg:block'>
                <img src={chair} alt="" className='' />
            </div>
        </section>
    );
};

export default AppointmentBanner;