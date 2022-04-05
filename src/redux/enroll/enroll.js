import axios from 'axios';

const GET_ENROLLMENTS_REQUEST = 'GET_ENROLLMENTS_REQUEST';
const GET_ENROLLMENTS_SUCCESS = 'GET_ENROLLMENTS_SUCCESS';
const GET_ENROLLMENTS_FAIL = 'GET_ENROLLMENTS_FAIL';

const GET_ENROLLMENT_BY_ID_REQUEST = 'GET_ENROLLMENT_BY_ID_REQUEST';
const GET_ENROLLMENT_BY_ID_SUCCESS = 'GET_ENROLLMENT_BY_ID_SUCCESS';
const GET_ENROLLMENT_BY_ID_FAIL = 'GET_ENROLLMENT_BY_ID_FAIL';

const DELETE_ENROLLMENT_REQUEST = 'DELETE_ENROLLMENT_REQUEST';
const DELETE_ENROLLMENT_SUCCESS = 'DELETE_ENROLLMENT_SUCCESS';
const DELETE_ENROLLMENT_FAIL = 'DELETE_ENROLLMENT_FAIL';

const CREATE_ENROLLMENT = 'comic_dance_club/CREATE_ENROLLMENT';
const ENROLLMENT_STATUS = 'comic_dance_club/ENROLLMENT_STATUS';

const baseUrl = process.env.REACT_APP_BASE_URL;

const initialState = {
  enroll_status: '',
};

export const getMyEnrollmentAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ENROLLMENTS_REQUEST });
    const { data } = await axios.get(`${baseUrl}/user/${userId}/enroll`);
    dispatch({ type: GET_ENROLLMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ENROLLMENTS_FAIL, payload: error.message });
  }
};

// eslint-disable-next-line consistent-return
export const getSingleEnrollmentAction = (id, userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ENROLLMENT_BY_ID_REQUEST });
    // const { user } = getState();
    const { data } = await axios.get(`${baseUrl}/user/${userId}/enroll/${id}`);
    dispatch({ type: GET_ENROLLMENT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ENROLLMENT_BY_ID_FAIL, payload: error.message });
  }
};

export const deleteEnrollmentAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_ENROLLMENT_REQUEST });
    const { user } = getState();
    await axios.delete(`${baseUrl}/user/${user.userId}/enroll/${id}`);
    dispatch({ type: DELETE_ENROLLMENT_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_ENROLLMENT_FAIL, payload: error.message });
  }
};

export const myEnrollmentReducer = (state =
{ loading: true, enroll: null, error: null }, action) => {
  switch (action.type) {
    case GET_ENROLLMENTS_REQUEST:
      return { loading: true };
    case GET_ENROLLMENTS_SUCCESS:
      return { loading: false, enroll: action.payload };
    case GET_ENROLLMENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const EnrollmentReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ENROLLMENT:
      return {
        ...payload,
      };
    case ENROLLMENT_STATUS:
      return {
        enroll_status: payload,
      };
    default:
      return state;
  }
};

export const enrollmentDetailsReducer = (state =
{ loading: true, enroll: null, err: null }, action) => {
  switch (action.type) {
    case GET_ENROLLMENT_BY_ID_REQUEST:
      return { loading: true };
    case GET_ENROLLMENT_BY_ID_SUCCESS:
      return { loading: false, enroll: action.payload };
    case GET_ENROLLMENT_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteEnrollmentReducer = (state = { enrollment: null }, action) => {
  switch (action.type) {
    case DELETE_ENROLLMENT_REQUEST:
      return { loading: true };
    case DELETE_ENROLLMENT_SUCCESS:
      return { loading: false, message: 'Enrollment Deleted Successfully' };
    case DELETE_ENROLLMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const EnrollmentStatusAction = (payload) => ({
  type: ENROLLMENT_STATUS,
  payload,
});

export const addEnrollmentToAPI = (details) => async (dispatch) => {
  const {
    from, to, cancelled, userId, classId,
  } = details;
  const enrollURL = `${baseUrl}/user/${userId}/enroll`;
  try {
    await fetch(enrollURL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          from,
          to,
          cancelled,
          user_id: userId,
          class_id: classId,
        },
      ),
    });
    dispatch(EnrollmentStatusAction('Enrollment Successfully Created!'));
  } catch (error) {
    dispatch(EnrollmentStatusAction('Enrollment was not Created!'));
  }
};
