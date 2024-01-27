import { Link, useLocation,useNavigate } from "react-router-dom";
import React from "react";
import car from "../images/car.jpg";

function Product({back_btn_callback, product_details, cart_callback}) {

    const back_click = () => {
        back_btn_callback(true);
    };

    const handleCart_add = () => {
        cart_callback(product_details);
    }
  

  return (
    <div style={{ margin: "120px 120px auto", fontFamily: "Montserrat" }}>
      <button
        style={{
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => back_click()}
      >
        Back
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div>
          <img
            src={product_details.image}
            alt="Product"
            style={{
              width: "350px",
              height: "370px",
              borderRadius: "20px",
              marginLeft: "80px",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "700",
              marginBottom: "30px",
            }}
          >
            {product_details.title}
          </p>
          <p style={{ fontSize: "15px", fontWeight: "400", color: "#808080" }}>
            Category
          </p>
          <p
            style={{
              fontSize: "15px",
              fontWeight: "600",
              color: "black",
              marginBottom: "20px",
            }}
          >
            Electronic
          </p>

          <p style={{ fontSize: "15px", fontWeight: "600", color: "#808080" }}>
            Description
          </p>
          <p
            style={{
              fontSize: "15px",
              fontWeight: "400",
              color: "black",
              marginBottom: "20px",
            }}
          >
            {" "}
            {product_details.description}
          </p>
          <p style={{ fontSize: "16px", fontWeight: "400", color: "black" }}>
            Price
          </p>

          <p style={{ fontSize: "36px", fontWeight: "700" }}>{product_details.price}</p>

          <button
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "10px",
              borderRadius: "16px",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onClick={() => handleCart_add()}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
