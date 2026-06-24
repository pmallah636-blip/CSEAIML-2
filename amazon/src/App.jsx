import React from "react";
import "./style.css";

function ProductCard(props) {
  return (
    <div className="product-card">
      <img src={props.image} alt={props.name} width="150" />
      <h3>{props.name}</h3>
      <p>₹{props.price}</p>
      <button>Add to Cart</button>
    </div>
  );
}

function App() {
  const products = [
    {
      id: 1,
      name: "Wireless Mouse",
      price: 599,
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      name: "Bluetooth Headphones",
      price: 1299,
      image: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      name: "Smart Watch",
      price: 2499,
      image: "https://via.placeholder.com/150"
    }
  ];

  return (
    <div>
      <h1>Amazon Clone - Featured Products</h1>

      <div className="products-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}

export default App;