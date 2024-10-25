import React from 'react';
import './HUDReturnButton.scss';

const HUDReturnButton = ({ onClick }) => {
  return (
    <button className="return-button" onClick={onClick}>
      <i className="fa-regular fa-flag"></i>
    </button>
  );
};

export default HUDReturnButton;