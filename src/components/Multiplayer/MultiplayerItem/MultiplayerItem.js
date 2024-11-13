import React from "react";
import "./MultiplayerItem.scss";

const MultiplayerItem = ({ title, description }) => {
  return (
    <div className="item">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default React.memo(MultiplayerItem);
