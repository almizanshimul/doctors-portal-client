import React from 'react';
import GetStartedButton from './GetStartedButton';
import doctor from '../../assets/images/doctor.png'

const Appointment = () => {
    return (
        <section className='flex justify-center items-center  bg-[url("https://i.ibb.co/LPB4jKh/bg-blue-1.png")] my-24'>
            <div className='flex-1 hidden lg:block'>
                <img src={doctor} alt="" className='mt-[-150px]' />
            </div>
            <div className='flex-1 text-white p-5'>
                <h3 className='text-xl text-primary'>Appointment</h3>
                <h2 className='text-3xl'>Make an appointment Today</h2>
                <p className='my-5'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                <GetStartedButton></GetStartedButton>
            </div>
        </section>
    );
};

export default Appointment;