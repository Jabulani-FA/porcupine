import React, { useEffect, useMemo, useState } from 'react'
import { DateTimePicker} from "react-datetime-picker"
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import { Card } from 'antd'
import { useSelector } from 'react-redux'
import {CloseOutlined, CheckOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import { deleteTodo, getTodos, todoDone } from '../functions/todo'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Slugify from 'slugify'
import {LoadingOutlined} from '@ant-design/icons'

const TodoList = ({filtered,setfiltered, pickedDate, setpickedDate, states}) => {
    const selector = useSelector((state) => ({...state}))
    const {todo, user} =  useMemo(() => selector, [selector])
    const dispatch = useDispatch()
    const checkDate = new Date(pickedDate).toLocaleDateString() || new Date().toLocaleDateString()
    const [otherfilters, setotherfilters] = useState('')
    const [moreHandle, setmoreHandle] = useState(null)
    const [loading, setloading] = useState(null)

    useEffect(() => {
        if (states !== null && states.date) {
            setfiltered(true)
            setpickedDate(new Date(states.date))
        }
    }, [states,setfiltered,setpickedDate])
    

    const handleDelete = (todo) => {
        // delete a todo
        const confirm = window.confirm('Do you want to Delete?')
        if(confirm) {
            const token = user && user.token
            setloading(todo._id)
            deleteTodo(token, todo._id)
            .then((res) => {
                getTodos(user.token).then((res2) => {
                    dispatch({
                        type: 'TODO',
                        payload: res2.data
                    })
                    setloading(null)
                }).catch((err) => {
                    setloading(null)
                    console.log(err)
                })
            })
            .catch((err) => {
                setloading(null)
                console.log(err)
            })
        }
    }

    const handleDone = (todo) => {
        // 
        const confirm = window.confirm('Mark as Completed?')
        if(confirm) {
            setloading(todo._id)
            todoDone(user.token, todo._id)
            .then((res) => {
                getTodos(user.token).then((res2) => {
                    dispatch({
                        type: 'TODO',
                        payload: res2.data
                    })
                    setloading(null)
                }).catch((err) => {
                    setloading(null)
                    console.log(err)
                })
            }).catch((err) => {
                setloading(null)
                console.log(err)
            })
        }
    }
    const handleDate = (date) => {
        // 
        setpickedDate(new Date(date))
    }

    const additionalFilters = (todo) => {
        // 
        if (otherfilters === 'Completed'){
            // 
            if (todo.done === true) {
                return todo
            } else {
                return
            }
        }
        else if (otherfilters === 'Not-Completed'){
            // 
            if (todo.done === false) {
                return todo
            } else {
                return
            }
        }
        else if (otherfilters === 'Before-Noon'){
            // 
            if (new Date(todo.date).toLocaleTimeString().endsWith('AM')) {
                return todo
            } else {
                return
            }
        }
        else if (otherfilters === 'After-Noon'){
            // 
            if (new Date(todo.date).toLocaleTimeString().endsWith('PM')) {
                return todo
            } else {
                return
            }
        }
        else {
            // 
            return true
        }
    }

  return (
    <div className='container'>
        {filtered && 
            <>
                <div className='row mb-2'>
                    <div className='col d-flex justify-content-center'>
                        <h5>Filters</h5>
                    </div>
                </div>
                <div className='row mb-2'>
                    <div className='col mb-1'>
                        <div className='d-flex align-items-center justify-content-end'>
                            <DateTimePicker value={pickedDate} onChange={(date) => handleDate(date)}/>
                        </div>
                    </div>
                    <div className='col-md-6 d-flex align-items-center justify-content-center me-4'>
                        <select onChange={(e) => setotherfilters(e.target.value)}>
                            <option value=''>Select Filters/ None</option>
                            <option value='Completed'>Completed</option>
                            <option value='Not-Completed'>Not Completed</option>
                            <option value='Before-Noon'>Before Noon</option>
                            <option value='After-Noon'>After Noon</option>
                        </select>
                    </div>
                </div>
            </>
            
        }
        {todo && todo.map((tod,i) => checkDate === new Date(tod.date).toLocaleDateString() && additionalFilters(tod) && (
            <div key={tod._id} className='d-flex justify-content-center mb-2'>
                <Card
                style={{width: 700,
                maxWidth: 1200}}
                >
                    <div>
                        <div className='d-flex justify-content-between'>
                            <h4>{tod.title}</h4>
                            <p className= {`${tod.done?'text-success':'text-danger'}`}>Completed {tod.done?<CheckOutlined className='ms-2 '/>:<CloseOutlined className='ms-2'/>}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            {tod.description.length>100?moreHandle === i?<p>{tod.description} <Link to={'#'} onClick={() => setmoreHandle(null)}>show less</Link> </p>:<p>{tod.description.substring(0,100)}...<Link to={'#'} onClick={() => setmoreHandle(i)}>show more</Link></p>:<p>{tod.description}</p>}
                        </div>
                        <div className='d-flex justify-content-between align-items-center' style={{cursor: "pointer"}}>
                            {loading === todo._id?<LoadingOutlined/>:<p onClick={() => handleDelete(tod)} className='text-danger'><DeleteOutlined/> Delete</p>}
                            {loading === todo._id?<LoadingOutlined/>:<p className='text-primary'><Link to={tod.done?'#':`/todo/edit/${Slugify(tod.title)}`} state={{id: `${tod._id}`}}><EditOutlined/></Link> Edit</p>}
                            <p className='d-flex align-items-center'><input type='checkbox' onChange={() => handleDone(tod)} checked={tod.done} disabled={tod.done || loading === todo._id}/>Done</p>
                            <p>{`Time Set: ${new Date(tod.date).toLocaleTimeString()} `}</p>
                        </div>
                    </div>
                </Card>
            </div>

        ))}
    </div>
  )
}

export default TodoList