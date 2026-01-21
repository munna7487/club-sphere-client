import React from 'react';
import UseAuth from '../hooks/UseAuth';
import Userole from '../hooks/Userole';
import { useLocation } from 'react-router';

// Simple Loading component
const Loading = () => <div>Loading...</div>;

// Simple Forbidden component
const Forbidden = () => <div>🚫 Forbidden: You are not an admin</div>;

const Adminroute = ({ children }) => {  // ✅ children destructure
    const { user, loading } = UseAuth();
    const { role, isLoading: roleloading } = Userole();  // ✅ role loading fix
    const location = useLocation();

    if (loading || roleloading) {
        return <Loading />;  // ✅ fix invalid <loading>
    }

    if (role !== 'admin') {
        return <Forbidden />;  // ✅ fix invalid <Forbidden>
    }

    return children;
};

export default Adminroute;
