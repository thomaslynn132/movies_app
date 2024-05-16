import { black, blacklip, red } from "../Assets/index";
import Vapes from "./vapes";
const NewReleaseTwo = () => {
  return (
    <>
      <div
        className="bg-dark d-flex flex-row justify-content-start align-items-center my-5 p-2 rounded"
        style={{ zIndex: "2", marginLeft: "5vw", marginRight: "5vw" }}>
        <div className="d-flex flex-column" style={{ alignItems: "center" }}>
          <img
            src={black}
            alt="black"
            style={{ width: "100px", height: "auto", zIndex: "1" }}
          />
          <div className="text-light">
            <h2>Devices</h2>
            <p>Find the best for you here.</p>
          </div>
        </div>
        <Vapes />
      </div>
      <div
        className="bg-dark d-flex my-5 flex-row justify-content-start rounded align-items-center my-2 "
        style={{ zIndex: "2", marginLeft: "5vw", marginRight: "5vw" }}>
        <div className="d-flex flex-column" style={{ alignItems: "center" }}>
          <img
            src={blacklip}
            alt="black"
            style={{ width: "100px", height: "auto", zIndex: "1" }}
          />
          <div className="text-light">
            <h2>Pods</h2>
            <p>Variety of choices available</p>
          </div>
        </div>
        <Vapes />
      </div>

      <div
        className="bg-dark d-flex rounded flex-row justify-content-start align-items-center my-2 p-2"
        style={{ zIndex: "2", marginLeft: "5vw", marginRight: "5vw" }}>
        <div className="d-flex flex-column" style={{ alignItems: "center" }}>
          <img
            src={red}
            alt="black"
            style={{ width: "100px", height: "auto", zIndex: "1" }}
          />
          <div className="text-light d-flex flex-column nrText p-3">
            <h2>Disposable</h2>
            <p>Easy, clean & superb flavor</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewReleaseTwo;
