import { useState } from "react";

const useFadeOut = (initialState = false) => {
  const [isFadingOut, setIsFadingOut] = useState(initialState);

  const triggerFadeOut = (callback) => {
    setIsFadingOut(true);
    callback();
    setTimeout(() => {
      setIsFadingOut(false);
    }, 2000);
  };

  return [isFadingOut, triggerFadeOut];
};

export default useFadeOut;
