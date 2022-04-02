import React from 'react';
import { useSelector } from 'react-redux';

const Detail = () => {
  const classes = useSelector((state) => state.classs);
  const { classs } = classes;
  const {
    name, description, image, created_at: created, updated_at: updated,
    city,
  } = classs;

  if (!classs) {
    return (
      <h1>Loading</h1>
    );
  }
  return (
    <section>
      <h1>Hello details</h1>
      <div className="homepage-card mx-3">
        <div className="row">
          <div className="text-center mt-5">
            <p>
              Created-At:
              {' '}
              {created}
            </p>
            <p>
              Updated-At:
              {' '}
              {updated}
            </p>
            <p>
              City:
              {' '}
              {city}
            </p>
            <button className="btn btn-success book-danceclass my-4" type="button">Book danceclass</button>
          </div>
          <div className="singlecard">
            <img className="singledanceclass-image m-3" src={image} alt={name} />
            <h4 className="my-2 text-center danceclassname">{name}</h4>
            <p className="singledescription font-weight-light text-center ms-3">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
