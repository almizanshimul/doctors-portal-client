import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements, } from '@stripe/react-stripe-js';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51Lvk3hDLbXffjKyd9u4qbI5kD5PCmKTY4dXhZknIJzVunP4FqIz2gm5pNbKq3ocSHVpBnudnhaIc0dxHvyrfA4v200hsWLNT7w');

const Payment = () => {
    const { id } = useParams()
    const url = `https://fast-earth-10671.herokuapp.com/dashboard/booking/${id}`
    const { data: appointment, isLoading } = useQuery(['booking', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div className="card w-50 max-w-md bg-base-100 shadow-xl my-12">
                <div className="card-body">
                    <p className="text-success font-bold">Hello, {appointment.name}</p>
                    <h2 className="card-title">Please Pay for {appointment.treatmentName}</h2>
                    <p>Your Appointment: <span className='text-orange-700'>{appointment.date}</span> at {appointment.slot}</p>
                    <p><span className="font-bold">Please pay:</span> ${appointment.price}</p>
                </div>
            </div>
            <div className="card w-50 max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm appointment={appointment} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;