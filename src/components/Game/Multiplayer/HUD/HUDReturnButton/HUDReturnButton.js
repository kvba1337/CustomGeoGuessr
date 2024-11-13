import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { setReturnButtonStatus } from "@redux/actions/gameActions";
import "./HUDReturnButton.scss";

const HUDReturnButton = () => {
  const dispatch = useDispatch();

  const handleReturnClick = useCallback(() => {
    dispatch(setReturnButtonStatus("activated"));
  }, [dispatch]);

  return (
    <button className="return-button" onClick={handleReturnClick}>
      <i className="fa-regular fa-flag"></i>
    </button>
  );
};

export default React.memo(HUDReturnButton);
