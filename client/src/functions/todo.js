import axios from 'axios'

export const createTodo = async (authtoken, values) => {
    return await axios.post(`${process.env.REACT_APP_API}/create-todo`,
    {values},
    {
        headers: {
            authtoken
        }
    })
}
export const editTodo = async (authtoken, values, id) => {
    return await axios.put(`${process.env.REACT_APP_API}/edit-todo/${id}`,
    {values},
    {
        headers: {
            authtoken
        }
    })
}
export const getTodos = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/get-todos`,
    {},
    {
        headers: {
            authtoken
        }
    })
}
export const getTodo = async (authtoken, id) => {
    return await axios.post(`${process.env.REACT_APP_API}/get-todo/${id}`,
    {},
    {
        headers: {
            authtoken
        }
    })
}
export const todoDone = async (authtoken, id) => {
    return await axios.post(`${process.env.REACT_APP_API}/todo-done/${id}`,
    {},
    {
        headers: {
            authtoken
        }
    })
}
export const deleteTodo = async (authtoken, id) => {
    return await axios.delete(`${process.env.REACT_APP_API}/delete-todo/${id}`,
    {
        headers: {
            authtoken
        }
    })
}
export const checkTodo = async (authtoken, slug) => {
    return await axios.post(`${process.env.REACT_APP_API}/todo/${slug}`,
    {},
    {
        headers: {
            authtoken
        }
    })
}