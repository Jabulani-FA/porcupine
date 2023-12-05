import axios from 'axios';

export const createUser = async (authtoken, values) => {
    return await axios.post('http://localhost:8000/api/create-user',
    {values},
    {
        headers:{
            authtoken
        }
    })
}
export const currentUser = async (authtoken) => {
    return await axios.post('http://localhost:8000/api/current-user',
    {},
    {
        headers:{
            authtoken
        }
    })
}