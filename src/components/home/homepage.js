import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Home = () => {
  const classess = useSelector((state) => state.class);
  const { classs } = classess;
  console.log(classs, 'hello');
  if (!classs[0]) {
    return (
      <h1>Loading</h1>
    );
  }
  return (
    <section>
      <h1 className="class-heading text-center mt-3 text-uppercase">Latest Dance Class</h1>
      <div className="row">
        {
      classs[0].map((item) => (
        <div key={item.id} className="col-12 col-md-6 col-lg-4">
          <Link style={{ textDecoration: 'none' }} to={`${item.id}`} className="m-3">
            <img className="class-image center-block" src={item.image} alt={item.name} />
            <h4 className="my-2 text-center classname">{item.name}</h4>
            <p className="description font-weight-light text-left ms-3">
              {item.description}
            </p>
          </Link>
        </div>
      ))
    }
      </div>
    </section>
  );
};

export default Home;
