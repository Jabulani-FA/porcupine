import React, { useState } from 'react'
import auth from '../firebase/auth'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {createUser} from '../functions/auth'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const dispatch = useDispatch()
  const initialState = {
    email: "",
    Username: "",
    password: "",
  }
  const navigate = useNavigate()
  const [values, setvalues] = useState(initialState)
  const {email, password, Username} = values
  const [password2, setpassword2] = useState('')
  const [passworderror, setpassworderror] = useState(false)
  const [mismatchMessage, setmismatchMessage] = useState('')
  const [loading, setloading] = useState(false)


  const handleChange = (e) => {
    // 
    e.preventDefault()
    passworderror && setpassworderror(false)
    setvalues({...values, [e.target.name]:e.target.value})
  }

  const createuser = (token) => {
    createUser(token, values)
    .then((res) => {
        dispatch({
          type: "LOGGED_IN",
          payload: {
            email: res.data.email,
            Username: res.data.Username,
            token: token,
          }                            
        })
        setloading(false)
        setvalues({...values, email: '', first: '', last: '', Username: '', password: ''})
        setpassword2('')
        navigate('/todos')
    })
    .catch((err) => {
      console.log(err)
      setloading(false)
    })
  }

  const handleSubmit = (e) => {
    // 
    e.preventDefault()
    if(password !== password2){
        setpassworderror(true)
        setmismatchMessage('Password mismatch, password is case sensitive')
        setpassworderror(false);
        return        
    }
    else if(password.length < 6){
        setpassworderror(true)
        setmismatchMessage('Password length must be 6 characters or more')
        setpassworderror(false);
        return
    }
    else{
      setloading(true)
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            const token = user.accessToken
            createuser(token)
                // ...
                // create user profile in backend
                
                    // dispatch user gotten from backend to redux adn token from firebase   
        })
        .catch((error) => {
          setloading(false)
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // ..
        });
    }
  }
  
  const showSignUpForm = () =>
    <form className='form-group' onSubmit={handleSubmit}>
      <input type='email' className='form-control mb-2' name='email' value={email} placeholder='Enter Email Address' onChange={handleChange}/>
      <input type='text' className='form-control mb-2' name='Username' value={Username} placeholder='Enter Username' onChange={handleChange}/>
      <input type='password' className='form-control mb-2' name='password' value={password} placeholder='Enter Password' onChange={handleChange}/>
      <input type='password' className='form-control mb-2' name='password2' value={password2} placeholder='Confirm Password' onChange={(e) => setpassword2(e.target.value)}/>
      <p className='d-flex justify-content-end'>Have an account? <Link to='/'>Log In</Link></p>
      {passworderror && <p className='text-danger'>{mismatchMessage}</p>}
      <div className='d-flex justify-content-end'>
        <button className='btn btn-raised btn-primary'>{loading?'loading':"Signup"}</button>
      </div>
    </form>
  return (
    <div className='container align-items-center justify-content-center mt-4'>
      <h5 className='text-center mb-1'>Welcome Back! Login.</h5><br/>
      <div className='container d-flex align-items-center justify-content-center'>
        {showSignUpForm()}
      </div>
    </div>
  )
}

export default Signup