import React, { useEffect, useState } from 'react'
import { getTodo, editTodo } from '../functions/todo'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { DateTimePicker } from "react-datetime-picker"
import Signout from '../auth/Signout'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'

const TodoEdit = () => {
    const {user} = useSelector((state) => ({...state}))
    const location = useLocation()
    const navigate = useNavigate()
    const initialState = {
        title: "",
        description: "",
        date: "",
    }
    const [values, setvalues] = useState(initialState)
    const { title, description, date } = values
    useEffect(() => {
      getTodo(user&&user.token, location.state.id)
      .then((res) => {
        setvalues({...values, 'title':res.data.title, 'description': res.data.description, 'date': res.data.date})
      }).catch((err) => console.log(err))
    }, [location.state.id, user, values])
    
    const handleChange = (e) => {
        // 
        setvalues({...values, [e.target.name]: e.target.value})
    }

    const handleDate = (date) => {
        // 
        // console.log(e.target.value)
        setvalues({...values, 'date': new Date(date)})
    }

    const handleSubmit = () => {
        // 
        editTodo(user.token, values, location.state.id)
        .then((res) => {
            setvalues(initialState)
            navigate('/todos',{state:{added: true, date: date }})
        })
        .catch((err) => {
            console.log(err)
        })
    }

  return (
    <div>
        <Signout/>
        <div className='container'>
            <ArrowLeftOutlined onClick={() => navigate('/todos',{state:{added: true, date: date }})}/>
            <div >
                <h4 className='d-flex justify-content-center'>Edit Todo {title}</h4>
            </div>
        </div>
        <div className='container'>
            <input type='text' className='form-control mb-2' name='title' value={title} placeholder='Enter title' onChange={handleChange}/>
            <textarea style={{height: 200}} type='text' className='form-control mb-2' name='description' value={description} placeholder='Enter description' onChange={handleChange}/>
            <DateTimePicker name='date' value={date} onChange={(date) => handleDate(date)} disableClock={true}/>
            <div className='col d-flex justify-content-end'>
                <button onClick={() => handleSubmit()} className='btn btn-raised btn-primary'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default TodoEdit