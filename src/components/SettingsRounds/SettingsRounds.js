import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRounds } from "../../redux/actions/gameSettingsActions";
import "./SettingsRounds.scss";

const SettingsRounds = () => {
  const dispatch = useDispatch();
  const { rounds } = useSelector((state) => state.gameSettings);

  const handleRoundsChange = (rounds) => {
    dispatch(setRounds(rounds));
  };

  return (
    <div className="rounds">
      <h3>Number Of Rounds:</h3>
      <div className="rounds-options">
        {[1, 3, 5, 10].map((round) => (
          <label
            key={round}
            className={rounds === round ? "active" : ""}
            onClick={() => handleRoundsChange(round)}
          >
            {round}
            <input type="radio" name="rounds" value={round} />
          </label>
        ))}
      </div>
    </div>
  );
};

export default SettingsRounds;
