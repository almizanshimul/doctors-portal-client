import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';


import React from 'react';
import auth from '../../firebase.init';

const BookingModal = ({ treatment, selected, setTreatment, refetch }) => {
    const [user, loading, error] = useAuthState(auth);
    const { name, slots, price } = treatment;

    const handleBooking = async event => {
        event.preventDefault();
        const treatmentName = treatment.name
        const date = event.target.date.value;
        const slot = event.target.slot.value;
        const fullName = event.target.fullName.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const data = { treatmentName, date, slot, price, name: fullName, email, phone }
        // const booking = {
        //     treatmentId: _id,
        //     treatment:name,
        //     slot,
        //     patient:user.email,
        //     patientName:user.displayName,
        //     phone
        // }


        fetch('https://fast-earth-10671.herokuapp.com/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.success) {
                    toast.success(`Appointment is set, ${date} at ${slot}`)
                } else {
                    toast.error(`Already have an Appointment on ${data?.booking?.date} at ${data?.booking?.slot}`)
                }
                refetch()
                setTreatment(null)
            })
    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle p-2 ">
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