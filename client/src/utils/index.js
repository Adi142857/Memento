import Axios from "axios";

import jwt_decode from 'jwt-decode';

const creteOrGetUser =async(response)=>{

    const decoded=jwt_decode(response.credential);
    // const {name,picture,sub}=decoded;
    console.log(decoded);
};

export default creteOrGetUser;