import { black, blacklip, red } from "../Assets/index";
import Vapes from "./vapes";
const NewReleaseTwo = () => {
  return (
    <>
      <div
        className="bg-dark d-flex flex-row justify-content-start align-items-center my-2 p-2"
        style={{ zIndex: "2" }}>
        <img
          src={black}
          alt="black"
          height={250}
          width={200}
          style={{ zIndex: "2" }}
        />
        <div className="text-light me-5">
          <h2>Devices</h2>
          <p>Find the best for you here.</p>
        </div>
        <div className="Images">
          <Vapes />
        </div>
      </div>
      <div
        className="bg-dark d-flex flex-row justify-content-start align-items-center my-2 p-2 "
        style={{ zIndex: "2" }}>
        <img
          src={blacklip}
          alt="black"
          height={250}
          width={200}
          style={{ zIndex: "1" }}
        />
        <div className="text-light me-5">
          <h2>Pods</h2>
          <p>Variety of choices available</p>
        </div>
        <div className="Images">
          <Vapes />
        </div>
      </div>

      <div
        className="bg-dark d-flex flex-row justify-content-start align-items-center my-2 p-2"
        style={{ zIndex: "2" }}>
        <img
          src={red}
          alt="black"
          height={250}
          width={200}
          style={{ zIndex: "1" }}
        />
        <div className="text-light me-5">
          <h2>Pods</h2>
          <p>Variety of choices available</p>
        </div>
        <div className="Images">
          <Vapes />
        </div>
      </div>
    </>
  );
};

export default NewReleaseTwo;
