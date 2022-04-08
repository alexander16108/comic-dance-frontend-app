import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadReservations } from './reducer';
import './index.css';

const Reservations = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservationsReducer.reservations);
  const role = useSelector((state) => state.authReducer.role);

  useEffect(() => {
    if (role) {
      dispatch(loadReservations());
    } else {
      navigate('/sign_in', { replace: true });
    }
  }, []);

  return (
    <div className="reservations">
      <h1 className="reservations-header">My reservations</h1>
      <ul className="reservations-container">
        {
          role && reservations.map((v) => (
            <li className="align" key={v.id}>
              <p>
                <span>Reservation Date :</span>
                {v.date}
              </p>
              <p>
                <span> City:</span>
                {' '}
                {v.city}
              </p>
              <p>
                <span>Dance Name: </span>
                {v.item.name}
              </p>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Reservations;
