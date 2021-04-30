import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

// action creator
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

// action creator
const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// thunk
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// thunk
export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = response.json();
    dispatch(setUser(data.user));
    return response;
}

//thunk
export const signup = (user) => async (dispatch) => {
    const { username, email, profilePicture, headerPicture, password } = user;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePicture) formData.append("profilePicture", profilePicture);
    if (headerPicture) formData.append("headerPicture", headerPicture);

    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: formData
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

//thunk
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
