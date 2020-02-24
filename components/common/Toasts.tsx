import React, { useEffect, FunctionComponent } from 'react';

import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { cleanToast } from 'actions/toast';
import getToastSelector from 'selectors/toast';

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
