import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import Signout from '../auth/Signout';
import { useDispatch } from 'react-redux';
import { createTodo } from '../functions/todo';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoButtons from './TodoButtons';
import { getTodos } from '../functions/todo';
import { useLocation } from 'react-router';

const Todos = () => {
  const selector = useSelector((state) => ({...state}))
  const {user} =  useMemo(() => selector, [selector])
    const dispatch = useDispatch()
    const location = useLocation()
    const initialState = {
      title: "",
      description: "",
      date: "",
    }
    const [values, setvalues] = useState(initialState)
    const { title, description, date } = values
    const [added, setadded] = useState(false)
    const [filtered, setfiltered] = useState(false)
    const [pickedDate, setpickedDate] = useState('')
    const [loading, setloading] = useState(false)
    useEffect(() => {
      if(added){
        setloading(true)
        getTodos(user&&user.token)
        .then((res) => {
          // set todo from the backend to the store
          dispatch({
            type: "TODO",
            payload: res.data,
          })
          setloading(false)
        })
        .catch((err) => {
          console.log(err)
          setloading(false)
        })
      }
    }, [added, user, dispatch])

    useEffect(() => {
      if (location.state !== null && location.state.added) {
        setadded(location.state.added)
      }
    }, [location])
    
    const handleDate = (date) => {
        // 
        // console.log(e.target.value)
        setvalues({...values, 'date': new Date(date)})
    }


    const handleSubmit = () => {
        // 
        if(title ==='' || description === '' || date ===''){
          return
        }else{
          setloading(true)
          createTodo(user.token, values)
          .then((res) => {
            setvalues(initialState)
            setloading(false)
          })
          .catch((err) => {
            console.log(err)
            setloading(false)
          })
        }
    }

  return (
    <div>
      {/* the link to sign out button, for route go to top*/}
      <Signout/>
      <div className='container'>
        <h3 className='my-3 text-center'>{pickedDate &&`${user.Username.charAt(0).toUpperCase()}${user.Username.slice(1)}'s Todo(s) List For `}{pickedDate?new Date(pickedDate).toDateString():new Date().toDateString()}</h3>
        <div>
          {/*filter, show todo and create todo button, then the todo form with the former immediate and later after, to check code, check by routes to designated names*/}
          <TodoButtons added={added} filtered={filtered} setadded={setadded} setfiltered={setfiltered}/>
          {!added && <TodoForm title={title} description={description} values={values} setvalues={setvalues} handleDate={handleDate} date={date} handleSubmit={handleSubmit} loading={loading}/>}

          {/*To the todo list mapped out here, for route go to top*/}
          {added && <TodoList filtered={filtered} setfiltered={setfiltered} date={date} pickedDate={pickedDate} setpickedDate={setpickedDate} states={location.state} />}
        </div>
      </div>
    </div>
  )
}

export default Todos