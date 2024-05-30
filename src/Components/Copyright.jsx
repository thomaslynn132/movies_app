import { background2 } from "../Assets";

const CopyrightNotice = () => {
  const currentYear = new Date().getFullYear();

  return (
    <p
      style={{
        backgroundImage: `url(${background2})`, // Use url() function
        backgroundSize: "75px",
      }}>
      &copy; Copyright {currentYear} All Rights Reserved. <br /> &copy;May 2024.
    </p>
  );
};

export default CopyrightNotice;
