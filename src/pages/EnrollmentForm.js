// /* eslint-disable jsx-a11y/label-has-associated-control */
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { addEnrollmentToAPI } from '../redux/enroll/enroll';

// const EnrollmentForm = () => {
//   const dispatch = useDispatch();

//   const [date1, setDate1] = useState('');

//   const [date2, setDate2] = useState('');

//   const userId = useSelector((state) => state.user.userId);
//   const status = useSelector((state) => state.EnrollmentReducer.enrollment_status);

//   const classId = 1;

//   const [enroll] = useState({
//     from: '',
//     to: '',
//     cancelled: false,
//     userId,
//     classId,
//   });

//   const submitEnrollment = () => {
//     dispatch(addEnrollmentToAPI({
//       ...enroll,
//       from: date1,
//       to: date2,
//     }));
//   };
//   const details = {
//     heading: 'Book a Dance Lesson/Class',
//     text: 'There are 15 different Dance Classes  and different instructors to learn from listed. Rangeing from South American Samba Dance to the modern break dances. Classes are taught by some of the world best dance instructors and alumni, Feel free to pick to a class to experience bliss learning wih your colleague and instructors',
//   };

//   return (
//     <div className="enrollment-form" data-testid="enrollmentForm">
//       <div id="color-overlay" />
//       <p>{status}</p>
//       <h1 className="enrollment-text">{details.heading}</h1>
//       <hr />
//       <p className="enrollment-text">{details.text}</p>
//       <form className="enrollment-text the-form">
//         <div className="datetime mt-3">
//           <h6>from: </h6>
//           <input type="date" id="date" className="form-control fc" onChange={(e) => setDate1(e.target.value)} value={date1} />
//         </div>
//         <div className="datetime mt-3">
//           <h6>to: </h6>
//           <input type="date" id="date" className="form-control fc" onChange={(e) => setDate2(e.target.value)} value={date2} />
//         </div>
//         <button type="button" className="mt-3 form-control fc submit-button" onClick={submitEnrollment}>Book Now</button>
//       </form>
//     </div>
//   );
// };

// export default EnrollmentForm;

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { addEnrollmentToAPI } from '../redux/enroll/enroll';
import { login } from '../redux/user/user';
import persistLogin from '../helpers/persistLogin';

const enrollmentForm = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const { dance, user } = useSelector((state) => state);
  const { danceClasses } = dance;
  const { userId } = user;

  const danceId = location.state ? location.state.id : 0;
  const danceToBook = danceClasses[0]
    ? danceClasses[0].find((each) => each.id === danceId) : [];

  const { reservation_expiry_date: expiryDate } = danceToBook;

  const [date1, setDate1] = useState(expiryDate);
  let [year, month, day] = date1 ? date1.split('-') : ['', '', ''];

  if (Number(month) === 12) {
    month = '01';
    year = Number(year) + 1;
    day = day.toString();
  } else {
    month = Number(month) + 1;
    if (month.toString().length === 1) {
      month = `0${month}`;
    }
  }

  const day2Value = `${year}-${month}-${day}`;

  const [date2, setDate2] = useState(day2Value);

  const [lease] = useState({
    from: '',
    to: '',
    cancelled: false,
    userId,
    danceId,
  });

  const submitEnrollment = () => {
    dispatch(addEnrollmentToAPI({
      ...lease,
      from: date1,
      to: date2,
      userId,
    }));
  };

  const details = {
    heading: 'Book a Dance Lesson/Class',
    text: 'There are 15 different Dance Classes  and different instructors to learn from listed. Rangeing from South American Samba Dance to the modern break dances. Classes are taught by some of the world best dance instructors and alumni, Feel free to pick to a class to experience bliss learning wih your colleague and instructors',
  };

  useEffect(() => {
    persistLogin(login, dispatch);
  }, []);

  return (
    <div className="enrollment-form" data-testid="enrollmentForm">
      <div id="color-overlay" />
      <h1 className="enrollment-text">{details.heading}</h1>
      <hr />
      <p className="enrollment-text">{details.text}</p>
      <form className="enrollment-text the-form">
        <div className="datetime mt-3">
          <h6>from: </h6>
          <input
            type="date"
            id="date"
            min={expiryDate}
            className="form-control fc"
            onChange={(e) => {
              setDate1(e.target.value);
              setDate2(() => day2Value);
            }}
            value={date1}
          />
        </div>
        <div className="datetime mt-3">
          <h6>to: </h6>
          <input
            type="date"
            id="date"
            min={day2Value}
            className="form-control fc"
            onChange={(e) => {
              setDate2(e.target.value);
            }}
            value={date2}
          />
        </div>
        <button type="button" className="mt-3 form-control fc submit-button" onClick={submitEnrollment}><Link to="/enrolled_classes" className="text-white">Book Now</Link></button>
      </form>
    </div>
  );
};

export default enrollmentForm;
