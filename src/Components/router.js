import Error404 from "../Pages/Error404";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import ContactUs from "../Pages/ContactUs";
import ExactMovie from "../Pages/ExactMovie";
import MoviesByViews from "../Pages/MoviesByViews";
import AdminPage from "../Pages/AdminPage";
import VIP from "../Pages/VIP";
import { useState } from "react";
import SearchResults from "../Pages/SearchedMovies";
import PrivateRoute from "../Auth/PrivateRoute";
import LogIn from "../Auth/LogIn";
import { AuthProvider } from "../Auth/AuthContext";
import AnimePage from "../Pages/Animes/AnimePage";
import MoviewByUploadedDate from "../Pages/MoviesByUploadedDate";
import MoviesByUploadedDate from "../Pages/MoviesByUploadedDate";
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
      component: <MoviewByUploadedDate movies={submittedMovies} />,
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
      path: "/movies/:id", // Use :id as a placeholder for the movie ID
    },

    {
      component: <SearchResults />,
      path: "/search",
    },
  ];

  // Generate routes for exact movie pages dynamically

  return (
    <AuthProvider>
      <Routes>
        {routes.map((route, index) => (
          <Route
            path={`${route.path}`}
            element={route.component}
            key={index}
            exact
          />
        ))}
        <Route
          path="/moviesByPostedDate/:page"
          component={<MoviesByUploadedDate movies={submittedMovies} />}
        />
        <Route
          path="/moviesByViews/:page"
          component={<MoviesByViews movies={submittedMovies} />}
        />

        <Route path="*" element={<Error404 />} key={Error404} />
      </Routes>
    </AuthProvider>
  );
};
