import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './auth/Login';
import Signup from './auth/Signup';
import Todos from './pages/Todos';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from './firebase/auth'
import { useDispatch } from 'react-redux';
import { currentUser } from './functions/auth';
import TodoEdit from './pages/TodoEdit';
import UserCheck from './auth/UserCheck';
import PageError from './auth/PageError';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, ((User) => {
      if(User) {
        const token = User.accessToken
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
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }))
  
    return () => unsubscribe()
  }, [dispatch])
  
  return (
    <div>
      {/*all routes for the app where the * route is for all other routes that does not exist*/}
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route element={<UserCheck/>}>
          <Route path='/todos' element={<Todos/>}/>
          <Route path='/todo/edit/:id' element={<TodoEdit/>}/>
        </Route>
        <Route path='*' element={<PageError/>}/>
      </Routes>
    </div>
  );
}

export default App;
