import React from "react";
import MultiplayerItem from "../MultiplayerItem/MultiplayerItem";
import "./MultiplayerContainer.scss";

const MultiplayerContainer = () => {
  return (
    <div className="container">
      <MultiplayerItem
        title="Invite your friends"
        description="Compete with your friends and family in the ultimate geography challenge."
      />
      <MultiplayerItem
        title="Play all game modes"
        description="Play together in your favourite game modes and experience endless hours of fun."
      />
      <MultiplayerItem
        title="Set your own rules"
        description="Design your own game with thousands of maps and customizable settings."
      />
    </div>
  );
};

export default MultiplayerContainer;
