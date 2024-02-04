import React from "react";
import {
  mint,
  mint1,
  mint2,
  mint3,
  mint4,
  mint5,
  mint6,
} from "../Assets/index";

const Vapes = () => {
  const images = [mint, mint1, mint2, mint3, mint4, mint5, mint6];

  return (
    <div
      className="d-flex flex-row"
      style={{ marginLeft: "5vw", marginRight: "5vw", alignItems: "center" }}>
      <div className="d-flex flex-row rounded vapeImages">
        {images.map((image, index) => (
          <div
            key={index}
            className={
              "d-flex flex-column bestDeal rounded devImg bestDealShadowAdd"
            }>
            <img src={image} alt={`Mint ${index + 1}`} className="vapesImg" />
            <p>
              <p className="fs-4 text-dark">
                Refreshing Mint <br />
                30,000 MMK{" "}
                <p className="yellow fw-bold" style={{ fontSize: "12px" }}>
                  ⭐500 Points
                </p>
              </p>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vapes;
