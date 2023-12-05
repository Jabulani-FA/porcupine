import React from 'react'
import { WarningOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const PageError = () => {
  return (
    <div className='d-flex align-content-center justify-content-center pt-5'>
        
        <div className='text-center mt-5' style={{fontSize: "24px"}}>
            <WarningOutlined className='text-warning me-2' style={{fontSize: "64px"}}/>
            404: Page does not exist
            <br/>
        </div>
        <Link className='justify-content-start' to={-1 || '/todos'}>return to previous page</Link>
    </div>
  )
}

export default PageError