import axios from 'axios';

const initialState = {
  name: '',
  email: '',
  loggedIn: 'out',
  userId: '',
  signedUp: false,
};

// Constants
const SIGN_UP = 'comic_dance_hall/SIGN_UP';
const LOGIN = 'comic_dance_hall/LOGIN';
const LOGOUT = 'comic_dance_hall/LOGOUT';

// Action Creators
export const signUp = (payload) => ({
  type: SIGN_UP,
  payload,
});

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const logout = (payload) => ({
  type: LOGOUT,
  payload,
});

// Reducers
export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_UP:
      return {
        ...payload,
      };
    case LOGIN:
      return payload;
    case LOGOUT:
      return payload;
    default:
      return state;
  }
};

const hitAPIWithSignupDetails = (details) => async (dispatch) => {
  const { name, email, password } = details;
  try {
    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_SIGN_UP_ENDPOINT}`,
      data: {
        user: {
          email,
          password,
          name,
        },
      },
    });

    dispatch(
      signUp({
        name: '',
        email: '',
        loggedIn: false,
        userId: '',
        signedUp: 'up',
      }),
    );
  } catch (error) {
    dispatch(
      signUp({
        name: '',
        email: '',
        loggedIn: false,
        userId: '',
        signedUp: 'down',
      }),
    );
  }
};

export const hitAPIWithSigninDetails = (details) => async (dispatch) => {
  const { email, password } = details;
  try {
    const signUpRespons = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_LOGIN_ENDPOINT}`,
      data: {
        user: {
          email,
          password,
        },
      },
    });

    const { data, headers } = signUpRespons;
    const { user } = data;
    const { authorization } = headers;

    const mainUser = {
      name: user.name,
      email: user.email,
      loggedIn: 'in',
      userId: user.id,
      signedUp: true,
    };

    localStorage.setItem('userAuth', JSON.stringify(authorization));
    localStorage.setItem('ComicDanceHallUser', JSON.stringify(mainUser));

    dispatch(signUp(mainUser));
  } catch (error) {
    dispatch(
      signUp({
        name: '',
        email: '',
        loggedIn: 'err',
        userId: '',
        signedUp: false,
      }),
    );
  }
};

export const hitAPIWithLogoutDetails = (details) => async (dispatch) => {
  const { userAuth } = details;
  try {
    await fetch(
      `${process.env.REACT_APP_LOGOUT_ENDPOINT}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${userAuth}`,
        },
      },
    );

    dispatch(logout({
      ...initialState,
      loggedIn: 'out',
      signedUp: false,
    }));

    localStorage.removeItem('userAuth');
    localStorage.removeItem('ComicDanceHallUser');
  } catch (error) {
    dispatch(
      logout({
        name: '',
        email: '',
        loggedIn: 'out',
        userId: '',
        signedUp: false,
      }),
    );
  }
};

export default hitAPIWithSignupDetails;
