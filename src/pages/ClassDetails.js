import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleEnrollmentAction } from '../redux/enroll/enroll';
import { login } from '../redux/user/user';
import persistLogin from '../helpers/persistLogin';


export default MyClassDetails;
