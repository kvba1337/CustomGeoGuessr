import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

import Header from "../../components/Header/Header";
import AuthModal from "../../components/AuthModal/AuthModal";
import "./Home.scss";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
      <div className="home">
        {isAuthenticated ? (
          <div className="home__content">
            <h1>Explore the World!</h1>
            <div className="home__buttons">
              <Link to="/select-map" className="home__button disabled">
                Singleplayer
              </Link>
              <Link to="/multiplayer" className="home__button">
                Multiplayer
              </Link>
            </div>
          </div>
        ) : (
          <AuthModal />
        )}
      </div>
    </>
  );
};

export default Home;
