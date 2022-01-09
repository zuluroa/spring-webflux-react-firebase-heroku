
import { URL_BASE } from "../config/url"

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SUCCESS = 'SUCCESS'

export const login = (email, uid, displayName, photoURL) => ({ type: LOGIN, payload: {email, uid, displayName, photoURL} })

export const logout = () => ({
    type: LOGOUT
});

export const success = (email, uid, displayName) => ({
    type: SUCCESS,
    email, 
    uid, 
    displayName
});

export function findUserById(id) {
    return async dispatch => {
        try {
            const response = await fetch(`${URL_BASE}/user/${id}`)
            const data = await response.json()
            dispatch(success(data.email, data.id, data.displayName ))
        } catch (error) {
            console.log("ERROR",error.message);
        }
    }
}

export function postUser(user) {
    return async dispatch => {
        try {
            const response = await fetch(`${URL_BASE}/createUser`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                }
            )
            const data = await response.json()
            dispatch(success(data.email, data.id, data.displayName ))
        } catch (error) {
            console.log("ERROR",error.message);
        }
    }
}

export function updateUser(user) {
    return async dispatch => {
        try {
            const response = await fetch(`${URL_BASE}/updateUser`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                }
            )
            const data = await response.json()
            dispatch(success(data.email, data.id, data.displayName ))
        } catch (error) {
            console.log("ERROR",error.message);
        }
    }
}


