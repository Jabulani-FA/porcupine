import React from 'react'
import { DateTimePicker} from "react-datetime-picker"
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'

const TodoForm = ({ title, description, setvalues, values, handleDate, handleSubmit, date, loading}) => {
    const handleChange = (e) => {
        // 
        setvalues({...values, [e.target.name]: e.target.value})
    }
  return (
    <div>
        <input type='text' className='form-control mb-2' name='title' value={title} placeholder='Enter title' onChange={handleChange} disabled={loading}/>
        <textarea style={{height: 200}} type='text' className='form-control mb-2' name='description' value={description} placeholder='Enter description' onChange={handleChange} disabled={loading}/>
        <DateTimePicker name='date' value={date} onChange={(date) => handleDate(date)} disableClock={true} disabled={loading}/>
        <div className='col d-flex justify-content-end'>
            <button onClick={() => handleSubmit()} className='btn btn-raised btn-primary'>{loading?"Loading":"Submit"}</button>
        </div>
    </div>
  )
}

export default TodoForm