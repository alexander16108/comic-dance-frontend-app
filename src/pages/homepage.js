import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaBackward, FaForward } from 'react-icons/fa';
import { login } from '../redux/user/user';
import persistLogin from '../helpers/persistLogin';

const Home = () => {
  const dispatch = useDispatch();
  const danceClass = useSelector((state) => state.class);
  const { classes } = danceClass;

  const [dance, setDance] = useState(
    classes[0] ? classes[0].slice(0, 3) : [],
  );

  const start = useRef(0);
  const multiplier = useRef(1);

  const [isMobile, setIsmobile] = useState(false);

  const pagination = (numPerPage, isForward, state) => {
    let result = [];
    if (isForward) {
      if (start.current < classes[0].length) {
        result = classes[0].slice(
          start.current,
          multiplier.current * numPerPage,
        );
        if (state === 'yes') {
          start.current += numPerPage;
          multiplier.current += 1;
        }
        setDance(() => result);
      } else {
        setDance(() => dance);
      }

      return false;
    } if (start.current >= numPerPage) {
      if (state === 'yes') {
        start.current -= numPerPage;
        multiplier.current -= 1;
      }
      result = classes[0].slice(
        start.current,
        multiplier.current * numPerPage,
      );
      setDance(() => result);
    }
    return dance;
  };

  useEffect(() => {
    persistLogin(login, dispatch);
  }, []);

  useEffect(() => {
    if (classes[0]) {
      setDance(() => pagination(3, true));
    }
  }, [classes]);

  window.onresize = () => {
    if (window.innerWidth < 1150) {
      setIsmobile(() => true);
    } else {
      setIsmobile(() => false);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 1150) {
      setIsmobile(() => true);
    } else {
      setIsmobile(() => false);
    }
  }, []);

  return (
    <div className="home-page">
      {!dance[0] ? (
        <h1>Loading</h1>
      ) : (
        <section data-testid="homepage">
          <h1 className="danceClass-heading text-center mt-3 text-uppercase">
            Latest Home
          </h1>
          <div className="classes-container">
            <div className={isMobile ? 'nav-box' : ''}>
              <FaBackward
                className="nav-button"
                onClick={() => {
                  if (classes[0]) {
                    pagination(3, false, 'yes');
                  }
                }}
                type="button"
              />
              {isMobile && (
              <FaForward
                className="nav-button"
                onClick={() => {
                  if (classes[0]) {
                    if (start.current === 0) {
                      start.current += 3;
                      multiplier.current += 1;
                    }
                    pagination(3, true, 'yes');
                    if (start.current + 3 > classes[0].length) {
                      start.current -= 3;
                      multiplier.current -= 1;
                    }
                  }
                }}
                type="button"
              />
              )}
            </div>
            {dance.map((items) => (
              <div key={DataTransferItemList.id}>
                <Link
                  style={{ textDecoration: 'none' }}
                  to="/details"
                  state={{ id: items.id }}
                >
                  <div className="homepage-card">
                    <img
                      className="danceClass-image hover_effect center-block"
                      src={items.image}
                      alt={items.name}
                    />
                    <h4 className="my-2 text-center danceClassname">{items.name}</h4>
                    <p className="description font-weight-light text-center ms-3">
                      {items.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
            <div className={isMobile ? 'nav-box' : ''}>
              {isMobile && (
              <FaBackward
                className="nav-button"
                onClick={() => {
                  if (classes[0]) {
                    pagination(3, false, 'yes');
                  }
                }}
                type="button"
              />
              )}
              <FaForward
                className="nav-button"
                onClick={() => {
                  if (classes[0]) {
                    if (start.current === 0) {
                      start.current += 3;
                      multiplier.current += 1;
                    }
                    pagination(3, true, 'yes');
                    if (start.current + 3 > classes[0].length) {
                      start.current -= 3;
                      multiplier.current -= 1;
                    }
                  }
                }}
                type="button"
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
