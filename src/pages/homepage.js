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
    if (localStorage.getItem('comicDanceClubUser')) dispatch(login(JSON.parse(localStorage.getItem('comicDanceClubUser'))));
  }, []);
  return (
    !classes[0] ? <h1>Loading</h1> : (
      <section>
        <h1 className="class-heading text-center mt-3 text-uppercase">Latest Home</h1>
        <div className="row">
          {
    classes[0].map((item) => (
      <div key={item.id} className="col-12 col-md-6 col-lg-4">
        <Link style={{ textDecoration: 'none' }} to={`${item.id}`} className="m-3" onClick={() => dispatch(singleClasses(item.id))}>
          <div className="card mx-3">
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
