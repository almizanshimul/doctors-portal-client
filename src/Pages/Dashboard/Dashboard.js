import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content p-10">
                    <h1 className='text-3xl text-green-600 font-bold '>Welcome to Dashboard</h1>
                    {/* <!-- Page content here --> */}
                    <Outlet />

                </div>
                <div className="drawer-side shadow-2xl	">
                    <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-50 bg-base-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link to={'/dashboard'}>My Appointment</Link></li>
                        <li><Link to={'/dashboard/my-review'}>My Review</Link></li>
                        <li><Link to={'/dashboard/history'}>My History</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;