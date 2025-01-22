import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { FaUser } from 'react-icons/fa';
import { CiUser } from "react-icons/ci";
import { PiListChecksBold } from "react-icons/pi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoPieChartSharp } from "react-icons/io5";



const IconButton = ({ icon: Icon, label, className, ...props }) => {
    return (
        <button
            className={`btn btn-ghost text-xl text-white font-bold flex gap-x-2 items-center ${className}`}
            {...props}
        >
            <Icon className="text-2xl" />
            {label}
        </button>
    );
};

const Dashboard = () => {
    return (
        <div className='flex'>
            {/* side-panel */}
            <div className='w-67 min-h-screen bg-zinc-600 border border-zinc-700 p-6'>
                <p>This will be dashboard</p>
                {/* user profile */}
                <NavLink to='/'><IconButton icon={IoHomeSharp} label='Home'></IconButton></NavLink>
                <NavLink to='/dashboard/profile'><IconButton icon={FaUser} label='Profile'></IconButton></NavLink>
                <NavLink><IconButton icon={PiListChecksBold} label='My Bookings'></IconButton></NavLink>
                <IconButton icon={FaFileInvoiceDollar} label='Transactions'></IconButton>
                <IconButton icon={MdOutlineError} label='My Complains'></IconButton>
            </div>

            {/* for owner */}
            <div className='w-67 min-h-screen bg-zinc-600 border border-zinc-700 p-6'>
                <p>This will be dashboard</p>
                {/* user profile */}
                <NavLink to='/'><IconButton icon={IoHomeSharp} label='Home'></IconButton></NavLink>
                <NavLink><IconButton icon={FaUser} label='Profile'></IconButton></NavLink>
                <NavLink><IconButton icon={FaMoneyBillTrendUp} label='My Earnings'></IconButton></NavLink>
                <IconButton icon={IoPieChartSharp} label='Statistics'></IconButton>
                <IconButton icon={PiListChecksBold} label='Booking Requests'></IconButton>
                <IconButton icon={MdOutlineError} label='Complains'></IconButton>
                {/* booking */}
                {/* complain-box */}
                {/* transaction history */}
            </div>



            <div className='flex-1 min-h-screen bg-zinc-500 border border-red-700'>
                this will be contents
                {/* <Outlet></Outlet> */}
            </div>
        </div>
    );
};

export default Dashboard;