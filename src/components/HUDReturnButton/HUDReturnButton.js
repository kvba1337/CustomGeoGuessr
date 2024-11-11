import React from "react";
import { useDispatch } from "react-redux";
import { setReturnButtonStatus } from "../../redux/actions/gameActions";
import "./HUDReturnButton.scss";

const HUDReturnButton = () => {
  const dispatch = useDispatch();

  const handleReturnClick = () => {
    dispatch(setReturnButtonStatus("activated"));
  };

  return (
    <button className="return-button" onClick={handleReturnClick}>
      <i className="fa-regular fa-flag"></i>
    </button>
  );
};

export default HUDReturnButton;
