import { IoIosArrowForward } from "react-icons/io";
import {
  member,
  diamond,
  gold,
  plate,
  black,
  blacklip,
  red,
} from "../Assets/index";
const Membership = () => {
  return (
    <div
      className="d-flex my-5 flex-row membershipCtn"
      style={{ marginLeft: "5vw", marginRight: "5vw" }}>
      <div
        className="d-flex flex-row m-1 membership rounded"
        style={{ width: "50vw", height: "auto" }}>
        <div className="d-flex flex-column justify-content-start p-2">
          <div className="d-flex flex-row start">
            <img
              src={diamond}
              alt="diamond"
              style={{ width: "7vw", height: "auto" }}
            />
            <img
              src={gold}
              alt="gold"
              style={{ width: "7vw", height: "auto" }}
            />
            <img
              src={plate}
              alt="silver"
              style={{ width: "7vw", height: "auto" }}
            />
          </div>
          <div className="me-4 start">
            <img
              src={member}
              alt="membership"
              style={{ width: "25vw", height: "auto" }}
            />
          </div>
          <div className="text-start ">
            <p className="fs-6">
              Be a Vape Pi member and <br /> get our special exclusive offers
            </p>
          </div>
          <div>
            <button className="rounded-pill viewBtn mt-3 me-5">View</button>
          </div>
        </div>
        {/* <div className="mt-auto memberImg end">
          <img
            src={vapes}
            alt="vapes"
            className="rounded "
            style={{
              transform: "scaleX(-1)",
              justifySelf: "flex-end",
              width: "15vw",
            }}
          />
        </div> */}
      </div>
      <div className="d-flex m-1 flex-row">
        <div className="d-flex flex-column membership m-1 rounded">
          <div className="">
            <img
              src={black}
              alt="black"
              style={{ width: "15vw", height: "auto" }}
            />
          </div>
          <div
            className="d-flex flex-row justify-content-between flex-row"
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "19vw",
            }}>
            <div className="text-start p-1">
              <p className="fs-4">Devices</p>
              <p className="">
                Find the best
                <br />
                for you here
              </p>
            </div>
            <div className="pe-1">
              <IoIosArrowForward />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex flex-column membership m-1 p-2 rounded">
            <div className="" style={{ width: "15vw", height: "auto" }}>
              <img src={blacklip} alt="red" />
            </div>
            <div
              className="d-flex flex-row justify-content-between"
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "20vw",
              }}>
              <div className="text-start px-1">
                <p className="fs-6">
                  Pods
                  <p style={{ fontSize: "10px" }}>
                    Variety of choices available
                  </p>
                </p>
              </div>
              <div className="">
                <IoIosArrowForward />
              </div>
            </div>
          </div>
          <div className="d-flex flex-column membership m-1 p-2 rounded">
            <div className="" style={{ height: "auto", width: "20vw" }}>
              <img src={red} alt="red" width={100} />
            </div>
            <div
              className="d-flex flex-row justify-content-between"
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "20vw",
              }}>
              <div className="text-start px-1">
                <p className="fs-6">
                  Disposible
                  <p style={{ fontSize: "10px" }}>
                    Easy, clean & superb flavor
                  </p>
                </p>
              </div>
              <div className="">
                <IoIosArrowForward />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
