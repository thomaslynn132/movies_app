import { background2 } from "../Assets";

const CopyrightNotice = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div
      style={{
        backgroundImage: `url(${background2})`, // Use url() function
        backgroundSize: "75px",
      }}>
      &copy; Copyright {currentYear}
      <br /> Who Cares <br /> &copy;May 2024.
    </div>
  );
};

export default CopyrightNotice;
