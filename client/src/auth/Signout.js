import React from 'react'
import { signOut } from 'firebase/auth';
import auth from '../firebase/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';


const Signout = () => {
    const {user} = useSelector((state) => ({...state}))
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignout = (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
            console.log('logged out')
            dispatch({
                type: "LOGGED_OUT",
                payload: null,
            })
            navigate('/')
        }).catch((err) => {
            console.log("error logging out", err)
        })
    }

  return (
    <div>
        {user && user.email && <div className='d-flex justify-content-end me-3'>
            <button className='mt-2 btn btn-raised btn-danger' onClick={handleSignout}>Sign Out</button>
        </div>}
    </div>
  )
}

export default Signout