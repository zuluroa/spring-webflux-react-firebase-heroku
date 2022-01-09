
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const login = (email, uid, displayName, photoURL) => ({ type: LOGIN, payload: {email, uid, displayName, photoURL} })

export const logout = () => ({
    type: LOGOUT
});



