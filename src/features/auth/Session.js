import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setSingInApi } from './reducer';
import './index.css';

const Session = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.authReducer);
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleInput = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    dispatch(setSingInApi('users/sign_in', state))
      .then((res) => {
        if (res.status) {
          navigate('/', { replace: true });
        }
      });

    event.preventDefault();
  };

  return (
    <form className="signup-page">
      <h1 className="formHeader">Sign In</h1>
      <div>
        {message.map((v) => (<p key={v}>{v}</p>))}
      </div>
      <div className="formGroup">
        <input
          className="formControl"
          type="email"
          name="email"
          value={state.email}
          onChange={handleInput}
          placeholder="Email"
          required
        />
      </div>

      <div className="formGroup">
        <input
          className="formControl"
          type="password"
          name="password"
          value={state.password}
          onChange={handleInput}
          placeholder="Password"
          required
          minLength={5}
          maxLength={50}
        />
      </div>

      <div className="formGroup">
        <button
          className="btn"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div className="formGroup">
        <Link to="/sign_up">
          <button
            className="btn"
            type="submit"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </Link>
      </div>
    </form>
  );
};

export default Session;
