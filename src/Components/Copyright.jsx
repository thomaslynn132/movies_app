const CopyrightNotice = () => {
  const currentYear = new Date().getFullYear();

  return (
    <p>&copy; Copyright {currentYear} C by D Co.Ltd . All Rights Reserved.</p>
  );
};

export default CopyrightNotice;
