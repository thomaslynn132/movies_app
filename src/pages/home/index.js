import {
  Header,
  PopularMovies,
  NewReleasedMovies,
  Membership,
} from "../../Components/utilities";
export default function Home() {
  return (
    <>
      <Header />
      <PopularMovies />
      <NewReleasedMovies />
      <Membership />
    </>
  );
}
