import React from "react";
import "./MultiplayerItem.scss";

const MultiplayerItem = ({ title, description, icon }) => {
  return (
    <div className="item">
      <div className="item__icon">
        <i className={icon}></i>
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default React.memo(MultiplayerItem);
