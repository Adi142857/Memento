import { AUTH, LOGOUT } from '../constants/actionTypes';


const authReducer=(state={authData:null},action)=>{
    switch(action.type){
        case AUTH:
            console.log("inAuthRed",action.payload);
            localStorage.setItem('profile',JSON.stringify(action.payload.user));
            localStorage.setItem('token',action.payload.token);
            return {...state , authData:action?.data};
        case LOGOUT:
            localStorage.clear();
            return { ...state,authData:null};
        default:
            return state;
    }
};

export default authReducer;