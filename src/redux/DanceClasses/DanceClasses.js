import fetchDataClasses, { fetchSingleClasses } from '../api';

const initialState = {
  classes: [],
  class: {},
};

// Constants
const FETCH_CLASSES = 'FETCH_CLASSES';
const FETCH_ONE_CLASS = 'FETCH_ONE_CLASS';

// Action Creators
export const getAllClasses = (payload) => ({
  type: FETCH_CLASSES,
  payload,
});

export const getOneClass = (payload) => ({
  type: FETCH_ONE_CLASS,
  payload,
});

// Reducers
export const classReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CLASSES:
      return {
        ...state,
        classes: [...state.classes, payload],
      };
    case FETCH_ONE_CLASS:
      return { class: payload };

    default:
      return state;
  }
};

export const fetchClasses = () => (async (dispatch) => {
  const classs = await fetchDataClasses();
  dispatch(
    {
      type: FETCH_CLASSES,
      payload: classs,
    },
  );
});

export const singleClasses = (id) => (async (dispatch) => {
  const classs = await fetchSingleClasses(id);
  dispatch(
    {
      type: FETCH_ONE_CLASS,
      payload: classs,
    },
  );
});

//  default fetchClasses;
