import React from "react";
import NavBar from "../Components/NavBar";

const Error404 = () => {
  return (
    <div>
      <NavBar />
      <h1>Error 404 - Page Not Found</h1>
      <p>The page you are looking for might not exist or has been moved.</p>
      <a href="./">
        <button>Go to Home Page</button>
      </a>
    </div>
  );
};

export default Error404;
