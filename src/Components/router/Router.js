import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../Auth/AuthContext";
import { PrivateRoute, LogIn } from "../Auth";
import { VIP } from "../utilities";
import {
  AdminPage,
  AnimePage,
  ContactUs,
  Error404,
  Home,
  MovieGenres,
  ExactMovie,
  MoviesByGenre,
  MoviesByReleasedYear,
  MoviesByUploadedDate,
  MoviesByViews,
  SearchResults,
} from "../../pages";
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
    {
      component: <MoviesByReleasedYear />,
      path: "/moviesByReleasedYear/:year",
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
