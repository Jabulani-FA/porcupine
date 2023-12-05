import React, { useState, useEffect } from 'react'
import auth from '../firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { currentUser } from '../functions/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const Login = () => {
  const initialState = {
    email: "",
    password: ""
  }
  const [values, setvalues] = useState(initialState)
  const [loading, setloading] = useState(false)
  const {email, password} = values
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector((state) => ({...state}))

  useEffect(() => {
    if (user && user.token) {
      navigate('/todos')
    }
  }, [user,navigate])
  
  const handleChange = (e) => {
    // 
    e.preventDefault()
    setvalues({...values, [e.target.name]:e.target.value})
  }

  const currentuser = (token) => {
    // 
    currentUser(token)
      .then((res) => {
        const user = res.data[0]
        dispatch({
          type: "LOGGED_IN",
          payload: {
            email: user.email,
            first: user.first,
            last: user.last,
            Username: user.Username,
            token: token,
          }                            
        })
        setvalues({...values, email: '', password: ''})
        setloading(false)
        navigate('/todos')
      })
  }

  const handleSubmit = (e) => {
    // 
    setloading(true)
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const token = user.accessToken
        // ...
        currentuser(token)
      })
      .catch((error) => {
        setloading(false)
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  }
  
  const showLoginForm = () =>
    <form className='form-group' onSubmit={handleSubmit}>
      <input type='email' className='form-control mb-2' name='email' value={email} placeholder='Enter Email Address' onChange={handleChange}/>
      <input type='password' className='form-control mb-2' name='password' value={password} placeholder='Enter Password' onChange={handleChange}/>
      <p className='d-flex justify-content-end'>No account? <Link to='/signup'>Create New Account</Link></p>
      <div className='d-flex justify-content-end'>
        <button className='btn btn-raised btn-primary' disabled={(user && user.token) || loading}>{loading?"Loading":'Login'}</button>
      </div>
    </form>

  return (
    <div className='container align-items-center justify-content-center mt-4'>
      <h5 className='text-center mb-1'>Welcome Back! Login.</h5><br/>
      <div className='container d-flex align-items-center justify-content-center'>
        {showLoginForm()}
      </div>
    </div>
  )
}

export default Login