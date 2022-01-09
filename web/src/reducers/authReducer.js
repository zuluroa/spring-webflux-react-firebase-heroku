import * as actions from '../actions/authActions'

export const initialState = {
  email: null,
  uid: null, 
  name : null, 
  photo: null
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN:
      const payload = action.payload;
      return {...state, email: payload.email, uid: payload.uid,  name: payload.displayName, photo: payload.photoURL }
    case actions.LOGOUT:
      return initialState
    default:
      return state
  }
}
