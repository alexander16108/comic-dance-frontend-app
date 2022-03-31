import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/user/user';

const DanceClasses = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('ComicDanceHallUser')) dispatch(login(JSON.parse(localStorage.getItem('ComicDanceHallUser'))));
  }, []);
  return (
    <h1 className="random">DanceClasses</h1>
  );
};
export default DanceClasses;
