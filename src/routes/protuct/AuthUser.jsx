import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthUser = () => {
  const { isUserExist } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserExist) {
      navigate('/login-page');
    }
  }, [isUserExist, navigate]); // Important: add dependencies

  return isUserExist ? <Outlet /> : null;
};

export default AuthUser;
