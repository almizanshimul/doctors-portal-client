import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Service from './Service';
import BookingModal from './BookingModal';


const AvailableAppointment = ({ selected }) => {
    const [services, setServices] = useState([]);
    const [treatment, setTreatment] = useState(null);


    useEffect(() => {
        fetch('services.json')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (
        <section className='py-20'>
            <div>
                <h2 className='text-3xl text-secondary text-center mb-8'>Available Appointment Date: {format(selected, 'PP')}</h2>

            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
    
                    {
                        services.map(service=>
                            <Service key={service._id}
                            service={service}
                            setTreatment={setTreatment}></Service>)
                    }
            </div>
            {treatment && <BookingModal 
            selected={selected} 
            treatment={treatment}
            setTreatment={setTreatment}
            ></BookingModal>}
        </section>
    );
};

export default AvailableAppointment;