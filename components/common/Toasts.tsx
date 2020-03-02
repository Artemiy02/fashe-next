import 'react-toastify/dist/ReactToastify.min.css';
import getToastSelector from 'selectors/toast';
import React, { useEffect, FunctionComponent } from 'react';
import { cleanToast } from 'reducers/toast';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';

const Toasts: FunctionComponent = () => {
  const dispatch = useDispatch();

  const toastData = useSelector(getToastSelector);

  useEffect(() => {
    if (toastData.type) {
      toast(toastData.message, { type: toastData.type } as ToastOptions);
      dispatch(cleanToast());
    }
  }, [toastData.type]);

  return <ToastContainer />;
};

export default Toasts;
