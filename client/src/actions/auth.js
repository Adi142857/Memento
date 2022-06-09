import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import { useNavigate } from 'react-router-dom';

export const signin=(formData,navigate)=> async(dispatch)=>{

    try{

        //log in
        const {data}= await api.signIn(formData);
        dispatch({type:AUTH, payload: data.result});
        navigate('/')
    }
    catch(error){
        console.log(error)
    }
}
export const signup=(formData, navigate)=> async(dispatch)=>{
    try{
        //sign
        const {data}= await api.signUp(formData);
        dispatch({type:AUTH},data);
        navigate('/')
    }
    catch(error){
        console.log(error)
    }
}