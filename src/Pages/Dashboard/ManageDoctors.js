import React from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const ManageDoctors = () => {
    const { data: doctors, isLoading, refetch } = useQuery(['doctors'], () => fetch(`http://localhost:4500/doctors`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    const handleDelete = (e) => {
        const email = e.email
        fetch(`http://localhost:4500/doctor/${email}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    window.confirm(`Are you confirm ${e.name} doctor delete`)
                    toast.success(`Doctor ${e.name} Deleted`)
                    refetch()
                } else {
                    toast.error('Failed to doctor deleted')
                }
            })
    }

    return (
        <div>
            <h2>Available doctors: {doctors.length}</h2>
            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        {/* <!-- head --> */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Specialty</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <!-- row 1 --> */}
                            {
                                doctors.map((doctor, index) => <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask rounded-full w-12 h-12">
                                                    <img src={doctor.img} alt={doctor.name} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{doctor.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{doctor.email}</td>
                                    <td>{doctor.specialty}</td>
                                    <th>
                                        <button className="btn btn-xs bg-red-400 text-white border-none" onClick={() => handleDelete(doctor)}>Remove Doctor</button>
                                    </th>
                                </tr>)
                            }


                            {/* <tr>
                                <th></th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Hart Hagerty</div>
                                        </div>
                                    </div>
                                </td>
                                <td>Email</td>
                                <td>Specialty</td>
                                <th>
                                <button className="btn btn-xs text-white">Remove Doctor</button>
                                </th>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageDoctors;