
import React, { useState } from "react";
import car from "../images/car.jpg";

function Cart({ cart_list }) {
  const [quantities, setQuantities] = useState(Array(cart_list.length).fill(1));
  const [isCheckoutSuccess, setCheckoutSuccess] = useState(false);

  const handleIncreaseQuantity = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const handleDecreaseQuantity = (index) => {
    if (quantities[index] > 1) {
      const newQuantities = [...quantities];
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    }
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);

    setTimeout(() => {
      setCheckoutSuccess(false);
    }, 3000);
  };

  return (
    <div style={{ margin: "100px" }}>
      <div
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Your Cart
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div>
          <div
            style={{
              fontWeight: "bold",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              margin: "0px 15px 10px 323px",
            }}
          >
            <p>Name</p>
            <p>Price</p>
            <p>Quantity</p>
          </div>

          {cart_list.map((item, index) => (
            <div
              key={item.id}
              style={{
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                src={item.image}
                alt={`Product ${index + 1}`}
                style={{ width: "100px", height: "75px", marginRight: "10px" }}
              />
              <div style={{ width: "120px" }}>
                <p>{item.title}</p>
              </div>
              <div>
                <p style={{ position: "relative", left: "-20px" }}>
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div>
                <button
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "8px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                  onClick={() => handleDecreaseQuantity(index)}
                >
                  -
                </button>
                {quantities[index]}
                <button
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "8px 6px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginLeft: "5px",
                  }}
                  onClick={() => handleIncreaseQuantity(index)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div
            style={{
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
              <p>Your Total </p>
            </div>
            <div style={{ marginBottom: "50px" }}>
              {cart_list.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p style={{ width: "120px" ,  
                      }}>
                      {item.title}x {quantities[index]} 
                  </p>
                  <p>${(item.price * quantities[index]).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div
              style={{
                fontWeight: "bold",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p>Total Price</p>
              <p>
                ${" "}
                {quantities
                  .reduce(
                    (total, quantity, index) =>
                      total + quantity * cart_list[index].price,
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
            <button
              onClick={handleCheckout}
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "10px",
                width: "100%",
              }}
            >
              Checkout
            </button>
            {isCheckoutSuccess && (
              <div
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  marginTop: "10px",
                  textAlign: "center",
                  opacity: 0.5,
                }}
              >
                Checkout Successful!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
