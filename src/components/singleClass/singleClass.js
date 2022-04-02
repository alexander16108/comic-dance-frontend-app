import React from 'react';
import { useSelector } from 'react-redux';

const Detail = () => {
  const classes = useSelector((state) => state.classs);
  const { classs } = classes;
  const { name, description, image } = classs;

  if (!classs) {
    return (
      <h1>Loading</h1>
    );
  }
  return (
    <section>
      <h1>Hello details</h1>
      <div className="card mx-3">
        <img className="class-image hover_effect center-block" src={image} alt={name} />
        <h4 className="my-2 text-center classname">{name}</h4>
        <p className="description font-weight-light text-center ms-3">
          {description}
        </p>
      </div>
    </section>
  );
};

export default Detail;
