import React from "react";
import { NavBar } from "../../Components/utilities";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div>
      <div className="navBarBgAdd">
        <NavBar />
      </div>
      <h1 className="reveal">Error 404 - Page Not Found</h1>
      <p className="reveal">
        The page you are looking for might not exist or has been moved.
      </p>
      <Link to="/">
        <button className="button reveal">Go to Home Page</button>
      </Link>
    </div>
  );
};

export default Error404;
