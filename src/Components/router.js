import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import ContactUs from "../Pages/ContactUs";
import ExactMovie from "../Pages/ExactMovie";
import MoviesByViews from "../Pages/MoviesByViews";
import AdminPage from "../Pages/AdminPage";
import VIP from "../Pages/VIP";
import SearchResults from "../Pages/SearchedMovies";
import PrivateRoute from "../Auth/PrivateRoute";
import LogIn from "../Auth/LogIn";
import MovieGenres from "../Pages/MoviesGenres"; // Corrected path
import MoviesByGenre from "../Pages/MoviesByGenere"; // Corrected path
import Error404 from "../Pages/Error404";
import { AuthProvider } from "../Auth/AuthContext";
import AnimePage from "../Pages/Animes/AnimePage";
import MoviesByUploadedDate from "../Pages/MoviesByUploadedDate";

export const Router = () => {
  const [submittedMovies, setMovies] = useState([]);

  const handleMovieSubmit = (movie) => {
    setMovies((prevMovies) => [...prevMovies, movie]);
  };

  const routes = [
    {
      component: <Home />,
      path: "/",
    },
    { component: <AnimePage />, path: "/animes" },
    {
      component: (
        <PrivateRoute>
          <AdminPage onMovieSubmit={handleMovieSubmit} />
        </PrivateRoute>
      ),
      path: "/admin",
    },
    { component: <LogIn />, path: "/login" },
    {
      component: <ContactUs />,
      path: "/contactUs",
    },
    {
      component: <MoviesByUploadedDate movies={submittedMovies} />,
      path: "/moviesByPostedDate",
    },
    {
      component: <MoviesByViews movies={submittedMovies} />,
      path: "/moviesByViews",
    },
    {
      component: <VIP />,
      path: "/vipCheck",
    },
    {
      component: <ExactMovie movies={submittedMovies} />,
      path: "/movies/:id",
    },
    {
      component: <SearchResults />,
      path: "/search",
    },
    {
      component: <MovieGenres />,
      path: "/genres",
    },
    {
      component: <MoviesByGenre />,
      path: "/genres/:genre",
    },
  ];

  return (
    <AuthProvider>
      <Routes>
        {routes.map((route, index) => (
          <Route
            path={route.path}
            element={route.component}
            key={index}
            exact
          />
        ))}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </AuthProvider>
  );
};
