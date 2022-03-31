const CREATE_ENROLLMENT = 'comic_dance_hall/CREATE_ENROLLMENT';
const ENROLLMENT_STATUS = 'comic_dance_hall/ENROLLMENT_STATUS';

const initialState = {
  lease_status: '',
};

const enrollementStatusAction = (payload) => ({
  type: ENROLLMENT_STATUS,
  payload,
});

export const EnrollementReducer = (state = initialState, action) => {
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

export const addEnrollementToAPI = (details) => async (dispatch) => {
  const {
    from, to, cancelled, userId, apartmentId,
  } = details;
  const leaseURL = `https://comic-dance-hall-api.herokuapp.com/user/${userId}/enrolled`;
  try {
    await fetch(leaseURL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        from,
        to,
        cancelled,
        user_id: userId,
        apartment_id: apartmentId,
      },
    });
    dispatch(enrollementStatusAction('Class Successfully Enrolled!'));
  } catch (error) {
    dispatch(enrollementStatusAction('Class was not Enrolled!'));
  }
};
