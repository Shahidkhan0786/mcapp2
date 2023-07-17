import React, { useState } from 'react'
import axios from "axios"
import useRequest from '../../hooks/use-request'
const signup = () => {
    const [email ,setEmail] = useState('ali@gmail.com')
    const [password ,setPasssword] = useState('12345')

    const {doRequest,errors} = useRequest({
      url: '/api/users/signup',
      method: 'post',
      body:{email,password}
    })
    const onSubmit = async (event)=>{
        event.preventDefault();
        const res = doRequest()
    }
  return (
    <>
    <h1 className='text-center p-3 bg-dark text-white mb-3'>SignUp</h1>
    <div className="container">
        
    <form onSubmit={onSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Email address
    </label>
    <input
      type="email"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
    />

  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Password
    </label>
    <input
      type="password"
      className="form-control"
      id="exampleInputPassword1"
      value={password}
      onChange={(e)=>setPasssword(e.target.value)}
    />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" htmlFor="exampleCheck1">
      Check me out
    </label>
  </div>
  <button type="submit" className="btn btn-primary">
    Submit
  </button>
</form>

    {errors}

    </div>
    </>
  )
}

export default signup