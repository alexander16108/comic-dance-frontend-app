import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { singleClasses } from '../redux/classes/DanceClasses';
import { login } from '../redux/user/user';

const Home = () => {
  const dispatch = useDispatch();
  const danceClass = useSelector((state) => state.class);
  const { classes } = danceClass;
  useEffect(() => {
    if (localStorage.getItem('someRandomVitalData')) {
      const { timestamp, mainUser } = JSON.parse(localStorage.getItem('someRandomVitalData'));
      const now = new Date().getTime();
      const oneDayInMillSecs = 86400000;
      if (now - timestamp < (7 * oneDayInMillSecs)) {
        dispatch(login(mainUser));
      } else {
        localStorage.removeItem('someRandomVitalData');
      }
    }
  }, []);
  return (
    !classes[0] ? <h1>Loading</h1> : (
      <section>
        <h1 className="class-heading text-center mt-3 text-uppercase">Latest Home</h1>
        <div className="row">
          {
    classes[0].map((item) => (
      <div key={item.id} className="col-12 col-md-6 col-lg-4">
        <Link style={{ textDecoration: 'none' }} to={`${item.id}`} onClick={() => dispatch(singleClasses(item.id))}>
          <div className="homepage-card">
            <img className="class-image hover_effect center-block" src={item.image} alt={item.name} />
            <h4 className="my-2 text-center classname">{item.name}</h4>
            <p className="description font-weight-light text-center ms-3">
              {item.description}
            </p>
          </div>
        </Link>
      </div>
    ))
  }
        </div>
      </section>
    )
  );
};

export default Home;
