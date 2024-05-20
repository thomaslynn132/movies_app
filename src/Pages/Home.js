import NewRelease from "../Components/NewReleased";
import Membership from "../Components/Membership";
import Header from "../Components/Header";
import PopularMovies from "../Components/PopularMovies";
export default function Home() {
  return (
    <>
      <Header />
      <PopularMovies />
      <NewRelease />
      <Membership />
    </>
  );
}
