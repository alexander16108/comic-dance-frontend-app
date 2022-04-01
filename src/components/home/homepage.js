import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const classess = useSelector((state) => state.class);
  const { classs } = classess;
  console.log(classs, 'hello');
  if (!classs[0]) {
    return (
      <h1>Loading</h1>
    );
  }
};
