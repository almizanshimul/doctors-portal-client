import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';


import React from 'react';
import auth from '../../firebase.init';

const BookingModal = ({ treatment, selected, setTreatment }) => {
    const [user, loading, error] = useAuthState(auth);
    const { name, slots } = treatment;



    const handleBooking = async event => {
        event.preventDefault();
        setTreatment(null)
        const treatmentName = treatment.name
        const date = event.target.date.value;
        const slot = event.target.slot.value;
        const fullName = event.target.fullName.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const data = { treatmentName, date, slot, name: fullName, email, phone }
        console.log(data);
        toast('Appointment Booking Added Successfully')
    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle p-2">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-secondary text-center">Booking For: {name}</h3>
                    <form onSubmit={handleBooking}>
                        <input name='date' type="text" value={format(selected, 'PP')} className="input w-full my-2 border border-[#D6D6D6] border-solid " disabled />
                        <select name='slot' className="select select-bordered w-full">
                            {
                                slots.map((slot, index) => <option key={index} value={slot}>{slot}</option>)
                            }
                        </select>
                        <input name='fullName' disabled type="text" value={user?.displayName || ''} className="input w-full my-2 border border-[#D6D6D6] border-solid " />
                        <input name='email' disabled type="email" value={user?.email || ''} className="input w-full my-2 border border-[#D6D6D6] border-solid " />
                        <input name='phone' type="number" placeholder="Phone" className="input w-full my-2 border border-[#D6D6D6] border-solid " />
                        <input type="submit" value='Submit' placeholder="Type here" className="btn btn-secondary w-full my-2 text-white " />
                    </form>
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;