import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/user/user';

const comicDanceClasses = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('comicDanceClubUser')) dispatch(login(JSON.parse(localStorage.getItem('comicDanceClubUser'))));
  }, []);
  return (
    <h1 className="random">DanceClasses</h1>
  );
};
export default comicDanceClasses;
