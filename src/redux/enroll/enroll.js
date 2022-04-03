const CREATE_ENROLLMENT = 'comic_dance_hall/CREATE_ENROLLMENT';
const ENROLLMENT_STATUS = 'comic_dance_hall/ENROLLMENT_STATUS';

const initialState = {
  enrollment_status: '',
};

const enrollmentStatusAction = (payload) => ({
  type: ENROLLMENT_STATUS,
  payload,
});

export const EnrollmentReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ENROLLMENT:
      return {
        ...payload,
      };
    case ENROLLMENT_STATUS:
      return {
        enrollment_status: payload,
      };
    default:
      return state;
  }
};

export const addEnrollmentToAPI = (details) => async (dispatch) => {
  const {
    from, to, cancelled, userId, itemId,
  } = details;
  const danceClassURL = `https://comic-dance-club.herokuapp.com/users${userId}`;
  try {
    await fetch(danceClassURL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        from,
        to,
        cancelled,
        user_id: userId,
        item_id: itemId,
      },
    });
    dispatch(enrollmentStatusAction('Class Successfully Enrolled!'));
  } catch (error) {
    dispatch(enrollmentStatusAction('Class was not Enrolled!'));
  }
};
