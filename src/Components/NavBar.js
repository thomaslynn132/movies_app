import { pi } from "../Assets/index";
import Search from "./SearchComponent";
import Menu from "./Menu";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div className="navBar reveal">
      <div>
        <Link to="/">
          <img className="reveal" src={pi} alt="Logo" height={50} />
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
