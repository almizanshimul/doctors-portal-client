import React from 'react';
import { toast } from 'react-hot-toast';

const UserRow = ({ user, index, refetch }) => {
    const { email, role } = user;
    // console.log(user);
    const makeAdmin = () => {
        fetch(`http://localhost:4500/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('failed to Make an admin')
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('User made an Admin successfully')
                    refetch()
                }
            })
    }

    return (
        <tr>
            <th>{index}</th>
            <td>{user?.name}</td>
            <td>{user.email}</td>
            <td>{role !== 'admin'
                ? <button onClick={makeAdmin} className="btn btn-xs">Make Admin</button>
                : <button disabled className="btn btn-xs">Admin</button>
            }
            </td>
            <td><button className="btn btn-xs bg-red-500 text-white border-none hover:bg-red-600">Remove User</button></td>
        </tr>
    );
};

export default UserRow;
