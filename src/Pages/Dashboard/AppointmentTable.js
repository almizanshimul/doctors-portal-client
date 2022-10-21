import React from 'react';

const AppointmentTable = ({ appointment,index }) => {
    const { date, email, name, slot, treatmentName } = appointment
    return (
        <tr>
            <th>{index}</th>
            <td>{name}</td>
            <td>{email}</td>
            <td>{treatmentName}</td>
            <td>{date}</td>
            <td>{slot}</td>
        </tr>
    );
};

export default AppointmentTable;