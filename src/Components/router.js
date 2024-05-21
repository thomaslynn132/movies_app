import Error404 from "../Pages/Error404";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import ActionMovies from "../Pages/ActionMovies";
import ContactUs from "../Pages/ContactUs";
import ExactMovie from "../Pages/ExactMovie";
import MoviesByViews from "../Pages/MoviesByViews";
import MoviesByPostedDate from "../Pages/MoviesByUploadedDate";
import MoviesByGeneres from "../Pages/MoviesByGeneres";
import AdminPage from "../Pages/AdminPage";
import VIP from "../Pages/VIP";
import AdultVideos from "../Pages/AdultVideos";
import { useState } from "react";
import SearchResults from "../Pages/SearchedMovies";
export const Router = () => {
  // Fetch movie IDs from Firestore to generate routes dynamically

  const [submittedMovies, setMovies] = useState([]);

  const handleMovieSubmit = (movie) => {
    setMovies((prevMovies) => [...prevMovies, movie]);
  };

  const routes = [
    {
      component: <Home />,
      path: "/",
    },
    {
      component: <ActionMovies />,
      path: "/actionmovies",
    },
    {
      component: <AdminPage onMovieSubmit={handleMovieSubmit} />,
      path: "/admin",
    },
    {
      component: <AdultVideos />,
      path: "/avs",
    },
    {
      component: <ContactUs />,
      path: "/contactUs",
    },
    {
      component: <MoviesByGeneres />,
      path: "/MovieByGeneres",
    },
    {
      component: <MoviesByPostedDate />,
      path: "/moviesByPostedDate",
    },
    {
      component: <MoviesByViews />,
      path: "/moviesByViews",
    },
    {
      component: <VIP />,
      path: "/vipCheck",
    },
    {
      component: <ExactMovie movies={submittedMovies} />,
      path: "/movies/:id", // Use :id as a placeholder for the movie ID
    },
    {
      component: <SearchResults />,
      path: "/search",
    },
  ];

  // Generate routes for exact movie pages dynamically

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route path={`${route.path}`} element={route.component} key={index} />
      ))}

      <Route path="*" element={Error404} key={Error404} />
    </Routes>
  );
};
