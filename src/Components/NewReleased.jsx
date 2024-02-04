import React from "react";
import { yellow, pink, blue, green } from "../Assets/index";
import { IoIosArrowForward } from "react-icons/io";

import { Container, Row, Col } from "react-bootstrap";
const NewRelease = () => {
  const products = [
    {
      stLine: "Citrus Mon",
      ndLine: "20,000 Pul",
      rdLine: "Disposable",
      nicPercent: "3 Percent",
      image: yellow,
      bgColor: "yellow",
    },
    {
      stLine: "Strawberry",
      ndLine: "Yogurt with",
      rdLine: "Refreshing Flavor",
      nicPercent: "3 Percent",
      price: "30,000 MMK",
      image: pink,
      bgColor: "pink",
    },
    {
      stLine: "Strawberry",
      ndLine: "Yogurt with",
      rdLine: "Refreshing Flavor",
      nicPercent: "3 Percent",
      price: "30,000 MMK",
      image: blue,
      bgColor: "blue",
    },
    {
      stLine: "Strawberry",
      ndLine: "Yogurt with",
      rdLine: "Refreshing Flavor",
      nicPercent: "3 Percent",
      price: "30,000 MMK",
      image: green,
      bgColor: "green",
    },
  ];
  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">
        <span className="text-danger">New</span> <span>Released</span>
      </h1>

      <Row className="justify-content-center">
        <Col lg={12}>
          <Row>
            {products.map((product, index) => (
              <Col key={index} md={6} className="mb-4 bsbb">
                <div
                  className="product-container p-3 rounded"
                  style={{
                    backgroundColor: product.bgColor,
                    boxSizing: "border-box",
                  }}>
                  <div className="text-dark">
                    <p className="font-weight-bold">
                      {product.stLine} <br />
                      {product.ndLine} <br />
                      {product.rdLine} <br />
                      Nic {product.nicPercent} <br />
                      {product.price}
                    </p>
                  </div>
                  <div className="text-center">
                    <img
                      src={product.image}
                      alt={product.stLine}
                      className="img-fluid"
                      style={{ height: "200px", width: "auto" }}
                    />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <div className="text-center">
        <button className="rounded-pill viewBtn1" size="lg">
          View More <IoIosArrowForward />
        </button>
      </div>
    </Container>
  );
};

export default NewRelease;
