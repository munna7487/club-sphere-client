import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/shared/Footer/Footer';
import Navbar from '../pages/shared/navbar/Navbar';


const Rootlayout = () => {
    return (
        <div>
            <div>
 <Navbar></Navbar>
            </div>
            <div className='max-w-7xl mx-auto'>
               
                <Outlet></Outlet>


            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Rootlayout;