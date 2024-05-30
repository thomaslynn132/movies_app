import { pi } from "../Assets/index";
import Search from "./SearchComponent";
import Menu from "./Menu";
import { background2 } from "../Assets/index";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div
      className="navBar"
      style={{
        backgroundImage: `url(${background2})`, // Use url() function
        backgroundSize: "75px",
      }}>
      <div>
        <Link to="/">
          <img src={pi} alt="Logo" height={50} />
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "sticky",
          marginRight: "10px",
          marginLeft: "auto",
        }}>
        <Search />
        <Menu />
      </div>
    </div>
  );
}
export default NavBar;
