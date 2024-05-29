import React from "react";
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div>
      <NavBar />
      <h1>Error 404 - Page Not Found</h1>
      <p>The page you are looking for might not exist or has been moved.</p>
      <Link href="./">
        <button className="button">Go to Home Page</button>
      </Link>
    </div>
  );
};

export default Error404;
