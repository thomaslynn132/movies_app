const CopyrightNotice = () => {
  const currentYear = new Date().getFullYear();

  return (
    <p>
      &copy; Copyright {currentYear} All Rights Reserved. <br /> &copy;May 2024.{" "}
    </p>
  );
};

export default CopyrightNotice;
