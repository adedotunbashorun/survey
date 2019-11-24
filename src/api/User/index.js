import {config} from '../../config'


const login = (data) => {
    return new Promise((resolve, reject) => {
        fetch(`${config.apiUrl}/api/login`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        .then((response) => response.json())
        .then(resp => {
            resolve(resp)
        })
        .catch(err => {
            reject(err)
        })
    })
}


const userById = (data, header) => {
    return new Promise((resolve, reject) => {
        fetch(`${config.apiUrl}/api/user/${data}`,{
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': header
            }
        })
        .then((response) => response.json())
        .then(resp => {
            resolve(resp)
        })
        .catch(err => {
            reject(err)
        })
    })
}


const register = (data) => {
    return new Promise((resolve, reject) => {
        fetch(`${config.apiUrl}/api/register`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type' : 'application/json',
            }
        })
        .then((response) => response.json())
        .then(resp => {
            resolve(resp)
        })
        .catch(err => {
            reject(err)
        })
    })
}


const activity = (data,header) => {
    return new Promise((resolve, reject) => {
        fetch(`${config.apiUrl}/api/my_activities/${data}`,{
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': header
            }
        })
        .then((response) => response.json())
        .then(resp => {
            resolve(resp)
        })
        .catch(err => {
            reject(err)
        })
    })
}

const allUser = (header) => {
    return new Promise((resolve, reject) => {
        fetch(`${config.apiUrl}/api/users`,{
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': header
            }
        })
        .then((response) => response.json())
        .then(resp => {
            resolve(resp)
        })
        .catch(err => {
            reject(err)
        })
    })
}


const logout = (header)  => {
    return new Promise((resolve, reject) => {
        fetch(`${config.apiUrl}/api/logout`,{
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': header
            }
        })
        .then((response) => response.json())
        .then(resp => {
            resolve(resp)
        })
        .catch(err => {
            reject(err)
        })
    })
}


export const User = {
    login,
    register,
    activity,
    logout,
    userById,
    allUser
}
