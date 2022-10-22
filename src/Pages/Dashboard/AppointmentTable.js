import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const AppointmentTable = ({ appointment, index, setUserLoading }) => {
    const { date, email, name, slot, treatmentName, price } = appointment;
    const [user] = useAuthState(auth)


    const handleDelete = (e) => {
        const id = e._id
        const confirm = window.confirm(`Are you confirm ${e.name} doctor delete`)
        if (confirm) {
            fetch(`https://fast-earth-10671.herokuapp.com/booking/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 403) {
                        toast.error("You don't have permission booking delete")
                        signOut(auth)
                    }
                    return res.json()
                })
                .then(data => {
                    if (data?.deletedCount > 0) {
                        toast.success(`Doctor ${e.treatmentName} Deleted`)
                        setUserLoading(false)
                        // refetch()
                    } else {
                        toast.error('Failed to Booking deleted')
                    }
                })
            setUserLoading(true)
        }
    }

    return (
        <tr>
            <th>{index}</th>
            {/* <td>{name}</td>
            <td>{email}</td> */}
            <td>{treatmentName}</td>
            <td>{date}</td>
            <td>{slot}</td>
            <td>
                {(price && !appointment.paid) && <Link to={`/dashboard/payment/${appointment._id}`} className='btn btn-xs bg-purple-500 text-white border-none'>Pay: {price}</Link>}
                {(price && appointment.paid) && <div>
                    <p><span className='text-success'>Paid</span></p>
                    <p>Transaction id: <span className='text-success'>{appointment.transactionId}</span></p>
                </div>}
            </td>
            <th><button onClick={() => { handleDelete(appointment) }} className="btn btn-xs bg-red-500 text-white border-none">Remove</button>
            </th>
        </tr>
    );
};

export default AppointmentTable;