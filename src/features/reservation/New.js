import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReservation } from './reducer';

const NewReservation = ({ itemId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.itemsReducer.items);
  const role = useSelector((state) => state.authReducer.role);
  const [state, setState] = useState({
    date: '',
    city: '',
    item_id: itemId,
  });

  const handleInput = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createReservation(state));
    navigate('/reservations', { replace: true });
  };

  useEffect(() => {
    if (!role) {
      navigate('/sign_in', { replace: true });
    }
  }, []);

  return (
    <form className="reserve-page">
      <h1 className="formHeader">New Reservation</h1>
      <div className="formGroup">
        <input
          className="formControl"
          type="text"
          name="city"
          value={state.value}
          onChange={handleInput}
          placeholder="City"
        />
      </div>

      <div className="formGroup">
        <input
          className="formControl"
          type="date"
          name="date"
          value={state.date}
          onChange={handleInput}
          placeholder="Date"
        />
      </div>

      {!itemId
          && (
            <div>
              <select name="item_id" value={state.item_id} onChange={handleInput}>
                {items.map((v) => (
                  <option key={v.id} name="item_id" value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
          )}

      <div className="formGroup">
        <button
          className="btn"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

NewReservation.propTypes = {
  itemId: PropTypes.number.isRequired,
};

export default NewReservation;
