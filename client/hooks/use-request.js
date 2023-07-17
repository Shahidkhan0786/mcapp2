import axios from 'axios';
import { useState } from 'react';

export default ({url,method,body , onSuccess})=>{
    const [errors , setErrors] = useState(null);

    const doRequest = async ()=>{
        try{
            setErrors(null);
            const res = await axios[method](url,body);
            if(onSuccess){onSuccess()}
            return res.data;
        }
        catch(err){
            // console.log(res.data)
            // setErrors(err.response.data.errors)
            setErrors(
                err.response.data.errors.map(err=><p className='text-danger text-center'> {err.message}</p>)
            )
        } 
    }

    return {doRequest, errors}
}