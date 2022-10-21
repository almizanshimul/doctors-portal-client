import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import AppointmentTable from './AppointmentTable';

const MyAppointments = () => {

    const [appointments, setAppointments] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:4500/booking?email=${user.email}`)
                .then(res => res.json())
                .then(data => setAppointments(data))
        }
    }, [user])
    return (
        <div>
            <h2>My Appointment: {appointments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Treatment Name</th>
                            <th>Treatment Date</th>
                            <th>Treatment Slot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            appointments.map((appointment, index) => <AppointmentTable key={appointment._id} appointment={appointment} index={1 + index}></AppointmentTable>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointments;