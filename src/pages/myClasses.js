import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { getMyEnrollmentAction, deleteEnrollmentAction } from '../redux/enroll/enroll';
import { login } from '../redux/user/user';
import persistLogin from '../helpers/persistLogin';

const EnrolledClasses = () => {
  const dispatch = useDispatch();
  const { enrolledClasses, user } = useSelector((state) => state);
  const { loading, enrolls, error } = enrolledClasses;
  const [id, setId] = useState('');

  useEffect(() => {
    if (user.userId) {
      dispatch(getMyEnrollmentAction(user.userId));
    }
  }, [user, dispatch]);

  useEffect(() => {
    persistLogin(login, dispatch);
  }, []);

  const handleSetId = (classs) => {
    setId(classs);
  };

  const handleDeleteEnrollment = (id) => {
    if (user.userId) {
      dispatch(deleteEnrollmentAction(id));
      setTimeout(() => {
        dispatch(getMyEnrollmentAction(user.userId));
      }, 350);
    }
  };

  const deleteModal = (classId) => (
    <>
      <RiDeleteBin6Line onClick={() => handleSetId(classId)} className=" delete-classs text-danger border-0 bg-transparent h2" data-bs-toggle="modal" data-bs-target="#exampleModal" />
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="exampleModalLabel">Are You Sure?</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" onClick={() => handleDeleteEnrollment(id)} className="btn  btn-danger " data-bs-dismiss="modal">Yes, Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    user ? (
      <div className="container p-5 d-flex justify-content-center">
        <div className="row g-5 d-flex justify-content-center">
          {error && <div className="alert alert-danger">error.message</div>}
          {!loading && enrolls.length === 0 && <h1 className="text-center text-info">You currently have no Classes</h1>}
          {
        loading ? <div> loading ...</div> : enrolls.map((classs) => (
          <div key={classs.classs_details.id} className="col-lg-3 col-md-4 col-sm-6 col-xs-6 col-12 single-classs">
            <img src={classs.class_details.image} className="classs-img card-img-top h-40" alt="..." />
            <div className="card-body">
              <p className="card-text">
                {classs.class_details.name}
              </p>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <Link to={`/my_classes/${classs.class_details.id}`} className="btn text-info">View</Link>
              {deleteModal(classs.class_details.id)}
            </div>
          </div>
        ))
      }
        </div>
      </div>
    ) : <p>Please, wait...</p>
  );
};

export default EnrolledClasses;
