import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.scss";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="button button-purple button-lg">
          <div className="button-wrapper">
            <span className="button-label">Go to Home</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
