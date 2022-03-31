/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEnrollmentToAPI } from '../redux/Enroll/Enroll';

const EnrollmentForm = () => {
  const dispatch = useDispatch();

  const [date1, setDate1] = useState('');

  const [date2, setDate2] = useState('');

  const userId = useSelector((state) => state.user.userId);
  const status = useSelector((state) => state.enrollmentReducer.enrollment_status);

  const classId = 1;

  const [enroll] = useState({
    from: '',
    to: '',
    cancelled: false,
    userId,
    classId,
  });

  const submitEnrollment = () => {
    dispatch(addEnrollmentToAPI({
      ...enroll,
      from: date1,
      to: date2,
    }));
  };
  const details = {
    heading: 'Book a Dance Lesson/Class',
    text: 'There are 15 different Dance Classes  and different instructors to learn from listed. Rangeing from South American Samba Dance to the modern break dances. Classes are taught by some of the world best dance instructors and alumni, Feel free to pick to a class to experience bliss learning wih your colleague and instructors',
  };

  return (
    <div className="lease-form" data-testid="leaseForm">
      <div id="color-overlay" />
      <p>{status}</p>
      <h1 className="lease-text">{details.heading}</h1>
      <hr />
      <p className="lease-text">{details.text}</p>
      <form className="lease-text the-form">
        <div className="datetime mt-3">
          <h6>from: </h6>
          <input type="date" id="date" className="form-control fc" onChange={(e) => setDate1(e.target.value)} value={date1} />
        </div>
        <div className="datetime mt-3">
          <h6>to: </h6>
          <input type="date" id="date" className="form-control fc" onChange={(e) => setDate2(e.target.value)} value={date2} />
        </div>
        <button type="button" className="mt-3 form-control fc submit-button" onClick={submitEnrollment}>Book Now</button>
      </form>
    </div>
  );
};

export default EnrollmentForm;
