import { citrus } from "../Assets";
const NewReleaseOne = () => {
  return (
    <>
      <div className="d-flex flex-row" style={{ margin: "5vw" }}>
        <div className="d-flex flex-row">
          <div>
            <img
              src={citrus}
              alt="citrus"
              className="citrus-img rounded-start"
            />
          </div>
          <div className="bg-dark text-white text-center citrus-text rounded-end">
            <h1 className="fs-1">Try New Flavor</h1>
            <p className="fs-3">Citrus Monster</p>
            <button className="rounded-pill viewBtn ml-5">View</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewReleaseOne;
