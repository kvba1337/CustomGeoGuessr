import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NextRoundInfo from "../NextRoundInfo/NextRoundInfo";
import HUDReturnButton from "../HUDReturnButton/HUDReturnButton";
import HUDRoundInfo from "../HUDRoundInfo/HUDRoundInfo";
import HUDTimer from "../HUDTimer/HUDTimer";
import MiniMapContainer from "../MiniMapContainer/MiniMapContainer";
import StreetViewMap from "../StreetViewMap/StreetViewMap";
import RoundResult from "../RoundResult/RoundResult";
import GameResult from "../GameResult/GameResult";
import { setCurrentLocation, roundOver } from "../../redux/actions/gameActions";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebaseConfig";
import "./GameMultiplayer.scss";

const GameMultiplayer = () => {
  const dispatch = useDispatch();
  const { status, gameLocations, currentRound } = useSelector(
    (state) => state.game
  );
  const { roomId } = useSelector((state) => state.room);

  useEffect(() => {
    if (status === "roundLive") {
      dispatch(setCurrentLocation(gameLocations[currentRound - 1]));
    }
  }, [status, currentRound, gameLocations, dispatch]);

  useEffect(() => {
    if (roomId) {
      const usersRef = ref(database, `rooms/${roomId}/users`);
      const unsubscribe = onValue(usersRef, (snapshot) => {
        const users = snapshot.val();
        if (users && Object.values(users).every((user) => user.hasGuessed)) {
          dispatch(roundOver());
        }
      });

      return () => unsubscribe();
    }
  }, [roomId, dispatch]);

  return (
    <div className="game-multiplayer">
      {status === "beforeRound" && <NextRoundInfo />}
      {status === "roundLive" && (
        <>
          <HUDReturnButton />
          <HUDRoundInfo />
          <HUDTimer />
          <StreetViewMap />
          <MiniMapContainer />
        </>
      )}
      {status === "roundOver" && <RoundResult />}
      {status === "gameOver" && <GameResult />}
    </div>
  );
};

export default GameMultiplayer;
