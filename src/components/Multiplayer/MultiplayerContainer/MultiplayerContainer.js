import React from "react"
import MultiplayerItem from "../MultiplayerItem/MultiplayerItem"
import "./MultiplayerContainer.scss"

const MultiplayerContainer = () => {
  const items = [
    {
      title: "Invite your friends",
      description:
        "Compete with your friends and family in the ultimate geography challenge.",
      icon: "fas fa-user-friends",
    },
    {
      title: "Play all game modes",
      description:
        "Play together in your favourite game modes and experience endless hours of fun.",
      icon: "fas fa-gamepad",
    },
    {
      title: "Set your own rules",
      description:
        "Design your own game with thousands of maps and customizable settings.",
      icon: "fas fa-cog",
    },
  ]

  return (
    <div className="container">
      {items.map((item, index) => (
        <MultiplayerItem
          key={index}
          title={item.title}
          description={item.description}
          icon={item.icon}
        />
      ))}
    </div>
  )
}

export default React.memo(MultiplayerContainer)
