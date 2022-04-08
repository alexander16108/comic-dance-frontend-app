import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NewReservation from '../reservation/New';
import './index.css';

const Details = () => {
  const [state, setState] = useState({});
  const items = useSelector((state) => state.itemsReducer.items);
  const [reserve, setReserve] = useState(false);
  const { itemId } = useParams();
  useState(() => {
    const item = items.filter((v) => v.id === Number(itemId));
    setState(item[0]);
  });

  const handleReserve = () => {
    setReserve(true);
  };

  return (
    <div className="align align-details">
      <h1 className="details-header">Details Page</h1>
      <div className="details-container">

        <div>
          <img className="details-images" src={state.picture} alt={state.description} />
        </div>
        <div className="details-texts">
          <p>
            {' '}
            <span>Dance Name:</span>
            {' '}
            {state.name}
          </p>
          <p>
            {' '}
            <span>Dance Description:</span>
            {' '}
            {state.description}
          </p>
          <p>
            {' '}
            <span>Class Fees:</span>
            {' '}
            {state.finance}
          </p>
          <p>
            {' '}
            <span>Total Fees:</span>
            {' '}
            {state.total}

          </p>
          <p>
            {' '}
            <span>Class Duration:</span>
            {' '}
            {state.duration}

          </p>
          <p>
            {' '}
            <span>Apr value:</span>
            {' '}
            {state.apr}

          </p>
          <div>
            {reserve && <NewReservation itemId={state.id} />}
            {!reserve && <button className="btn" type="button" onClick={handleReserve}>Reserve</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
