import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError, selectErrorMsg } from "../../redux/slices/errorSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Error = () => {
  const errorMsg = useSelector(selectErrorMsg);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorMsg) {
      toast.info(errorMsg);
      dispatch(clearError());
    }
  }, [errorMsg, dispatch]);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Error;
