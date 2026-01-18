import React, { use } from 'react';
import { Authcontex } from '../contex/authcontex/Authcontex';

const UseAuth = () => {
    const authinfo=use(Authcontex)
    return authinfo;
};

export default UseAuth;