import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleEnrollmentAction } from '../redux/enroll/enroll';
import { login } from '../redux/user/user';
import persistLogin from '../helpers/persistLogin';

const MyClassDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { classDetails, user } = useSelector((state) => state);
  const { classDetail, loading, err: error } = classDetails;

  useEffect(() => {
    if (user.userId) {
      dispatch(getSingleEnrollmentAction(params.enroll_id, user.userId));
    }
  }, [user]);

  useEffect(() => {
    persistLogin(login, dispatch);
  }, []);

  return (
    classDetail ? (
      <div className="container">
        {error && (
        <p className="alert alert-danger">
          {error}
        </p>
        ) }
        {loading ? 'loading' : (
          <div className=" card mb-3 mt-5">
            <div className="row g-0">
              <div className="col-md-5">
                <img src={enroll.classDetails.image} className="h-100 img-fluid rounded-start" alt="..." />
                {' '}

              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <h3 className="card-title text-info text-center">
                    {enroll.classDetails.name}
                  </h3>
                  <p className="text-center">
                    {' '}
                    {enroll.classDetails.description}
                    {' '}
                  </p>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td />
                        <td>City</td>
                        <td> - </td>
                        <td />
                        <td>{enroll.classDetails.city}</td>
                      </tr>
                      <tr>
                        <td />

                        <td>Monthly Fees</td>
                        <td> - </td>
                        <td />
                        <td>
                          $
                          {enroll.enrollDetails.monthly_fees}
                        </td>
                      </tr>
                      <tr>
                        <td />
                        <td>Expiry Date</td>
                        <td> - </td>
                        <td />
                        <td>{enroll.classDetails.reservation_expiry_date}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    ) : <p>Please, wait...</p>
  );
};

export default MyClassDetails;
