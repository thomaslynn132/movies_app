import { HiMenuAlt2 } from "react-icons/hi";
import { pi } from "../Assets/index";
import Search from "./SearchComponent";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div className="navBar">
      <div>
        <Link to="/">
          <img src={pi} alt="Logo" height={50} />
        </Link>
      </div>
      <div>
        <Search />
        <HiMenuAlt2 />
      </div>
    </div>
  );
}
export default NavBar;
