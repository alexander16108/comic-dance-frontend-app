import fetchDataClasses, { fetchSingleClasses } from '../api';

const initialState = {
  danceclasses: [],
  danceclass: {},
};

// Constants
const FETCH_DANCE_CLASSES = 'FETCH_DANCE_CLASSES';
const FETCH_ONE_DANCE_CLASS = 'FETCH_ONE_DANCE_CLASS';

// Action Creators
export const getAllClasses = (payload) => ({
  type: FETCH_DANCE_CLASSES,
  payload,
});

export const getOneClass = (payload) => ({
  type: FETCH_ONE_DANCE_CLASS,
  payload,
});

// Reducers
export const classReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_DANCE_CLASSES:
      return {
        ...state,
        danceclasses: [...state.danceclasses, payload],
      };
    case FETCH_ONE_DANCE_CLASS:
      return { danceclass: payload };

    default:
      return state;
  }
};

const fetchClasses = () => (async (dispatch) => {
  const danceClass = await fetchDataClasses();
  dispatch(
    {
      type: FETCH_DANCE_CLASSES,
      payload: danceClass,
    },
  );
});

export const singleClasses = (id) => (async (dispatch) => {
  const danceClass = await fetchSingleClasses(id);
  dispatch(
    {
      type: FETCH_ONE_DANCE_CLASS,
      payload: danceClass,
    },
  );
});

export default fetchClasses;
