import React from "react";
import "./NextRoundStart.scss";

const NextRoundStart = ({ countdown }) => (
  <div className="next-round-start">
    NEXT ROUND STARTS IN
    <div className="countdown">{String(countdown).padStart(2, "0")}</div>
  </div>
);

export default React.memo(NextRoundStart);
