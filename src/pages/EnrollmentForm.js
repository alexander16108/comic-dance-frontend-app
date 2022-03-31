/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

const EnrollmentForm = () => {
  const [date, setDate] = useState();
  const details = {
    heading: 'Book a Dance Lesson/Class',
    text: 'There are 15 different Dance Classes  and different instructors to learn from listed. Rangeing from South American Samba Dance to the modern break dances. Classes are taught by some of the world best dance instructors and alumni, Feel free to pick to a class to experience bliss learning wih your colleague and instructors',
  };

  return (
    <div className="enrollment-form">
      <h1>{details.heading}</h1>
      <hr />
      <p>{details.text}</p>
      <form>
        <div className="mb-3">
          <label htmlFor="textInput" className="form-label">Name</label>
          <input type="text" id="textInput" className="form-control" placeholder="Your name" value="User name" />
        </div>
        <div className="mb-3">
          <label htmlFor="select" className="form-label">Dance Class</label>
          <select id="select" className="form-select">
            <option selected>Selected Dance Class</option>
            <option>Wavy</option>
          </select>
        </div>
        {/* <div className="mb-3">
          <label htmlFor="select" className="form-label"> Dance</label>
          <select id="select" className="form-select">
            <option>Lusaka</option>
          </select>
        </div> */}
        <div className="datetime">
          <input type="datetime-local" id="date" onChange={(e) => setDate(e.target.value)} value={date} />
        </div>
        <button type="submit" className="btn btn-primary">Book Now</button>
      </form>
    </div>
  );
};

export default EnrollmentForm;
