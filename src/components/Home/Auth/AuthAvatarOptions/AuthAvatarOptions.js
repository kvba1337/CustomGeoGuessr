import React from "react";
import "./AuthAvatarOptions.scss";
import avatar1 from "@assets/images/avatars/avatar1.png";
import avatar2 from "@assets/images/avatars/avatar2.png";
import avatar3 from "@assets/images/avatars/avatar3.png";
import avatar4 from "@assets/images/avatars/avatar4.png";
import avatar5 from "@assets/images/avatars/avatar5.png";
import avatar6 from "@assets/images/avatars/avatar6.png";
import avatar7 from "@assets/images/avatars/avatar7.png";
import avatar8 from "@assets/images/avatars/avatar8.png";

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
];

const AuthAvatarOptions = ({ selectedAvatar, handleAvatarClick }) => (
  <div className="avatar-options">
    {avatars.map((avatar, index) => (
      <img
        key={index}
        src={avatar}
        alt={`Avatar ${index + 1}`}
        className={`avatar-option ${
          selectedAvatar === avatar ? "selected" : ""
        }`}
        onClick={() => handleAvatarClick(avatar)}
      />
    ))}
  </div>
);

export default React.memo(AuthAvatarOptions);
