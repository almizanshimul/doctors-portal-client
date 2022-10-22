import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { LoaderIcon, toast } from 'react-hot-toast';
import auth from '../../firebase.init';
import AppointmentTable from './AppointmentTable';
import { signOut } from 'firebase/auth';
import Loading from '../Shared/Loading';

const MyAppointments = () => {

    const [appointments, setAppointments] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const [userLoading, setUserLoading] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            fetch(`https://fast-earth-10671.herokuapp.com/booking?email=${user.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        navigate('/')
                        signOut(auth)
                        toast.error('User Unauthorized')
                    }
                    return res.json()
                })
                .then(data => {
                    setAppointments(data)
                    // setUserLoading(false)
                })
        }
    }, [user, userLoading])
    if (userLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='text-3xl my-2'>My total Appointment: {appointments.length}</h2>
            <div className='flex justify-evenly'>
                <p className='text-2xl my-2'><span className="font-bold">User Name:</span> {user.displayName}</p>
                <p className='text-2xl my-2'><span className="font-bold">User Email:</span> {user.email}</p>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            {/* <th>Name</th>
                            <th>Email</th> */}
                            <th>Treatment Name</th>
                            <th>Treatment Date</th>
                            <th>Treatment Slot</th>
                            <th>Payment</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            appointments.map((appointment, index) => <AppointmentTable
                                key={appointment._id}
                                appointment={appointment}
                                index={1 + index}
                                setUserLoading={setUserLoading}
                            ></AppointmentTable>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointments;