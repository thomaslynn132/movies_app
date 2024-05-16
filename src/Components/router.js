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
import { collection, getDocs, firestore } from "../firebase";
import AdultVideos from "../Pages/AdultVideos";
export const Router = () => {
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
      component: <AdminPage />,
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
      component: <ExactMovie />,
      path: "/movies/:id", // Use :id as a placeholder for the movie ID
    },
  ];
  // Fetch movie IDs from Firestore to generate routes dynamically
  const fetchMovieIds = async () => {
    const moviesCollection = collection(firestore, "movies");
    const querySnapshot = await getDocs(moviesCollection);
    return querySnapshot.docs.map((doc) => doc.id);
  };

  // Generate routes for exact movie pages dynamically
  fetchMovieIds().then((movieIds) => {
    movieIds.forEach((movieId) => {
      routes.push({
        component: <exactMovie />,
        path: `/movies/${movieId}`, // Generate route path dynamically with movie ID
      });
    });
  });
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route path={`${route.path}`} element={route.component} key={index} />
      ))}
      <Route path="*" element={Error404} key={Error404} />
    </Routes>
  );
};
