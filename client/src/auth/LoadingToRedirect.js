import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

const LoadingToRedirect = () => {
    const navigate = useNavigate()
    const [count, setcount] = useState(5)
    useEffect(() => {
      const interval = setInterval(() => {
        setcount((currentCount) => --currentCount)
      }, 1000);

      count === 0 && navigate('/')
      return () => clearInterval(interval)
    }, [count, navigate])
    
  return (
    <div className='d-flex justify-content-center mt-5'>
        <h3>Loading to redirect in {count} seconds...</h3>
    </div>
  )
}

export default LoadingToRedirect