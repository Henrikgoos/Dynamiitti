import { useState } from 'react'
import headerImage from './assets/mountains-8314422_1280.png'
import './App.css'

function App() {
  const products = [
    { name: 'AMD Ryzen 5 3600', price: 245 },
    { name: 'AMD Ryzen 9 7950X3D', price: 650 },
    { name: 'AMD Ryzen 7 9700X', price: 400 },
  ];

  const [selectProduct, setSelectProduct] = useState(products[0]);
  const [quantity, setQuantity] = useState(1);
  const total = selectProduct.price * quantity;

  return (
    <div>
      <Header image={headerImage} title="Welcome to the Product Page!" />
      
      <OrderForm
        products={products}
        selectProduct={selectProduct}
        setSelectProduct={setSelectProduct}
        quantity={quantity}
        setQuantity={setQuantity}
      />

      <OrderInfo 
        product={selectProduct.name} 
        quantity={quantity} 
        total={total} 
      />
    </div>
  );
}

function Header(props) {
  return (
    <div className="header">
      <img src={props.image} alt="Header" />
      <h1>{props.title}</h1>
    </div>
  );
}

function OrderForm({ products, selectProduct, setSelectProduct, quantity, setQuantity }) {
  const handleProductChange = (event) => {
    const product = products.find((p) => p.name === event.target.value);
    setSelectProduct(product);
  };

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div>
      <br />
      <b>Select product</b>
      <div className="orderform">
        <table>
          <tbody>
            <tr>
              <td>
                <p>Product:</p>
              </td>
              <td>
                <select value={selectProduct.name} onChange={handleProductChange}>
                  {products.map((product, index) => (
                    <option key={index} value={product.name}>
                      {product.name} - ({product.price}€)
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <p>Quantity:</p>
              </td>
              <td>
                <button onClick={decrease}>-</button>
                <span style={{ margin: '0 10px' }}>{quantity}</span>
                <button onClick={increase}>+</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrderInfo({ product, quantity, total }) {
  return (
    <div className="orderinfo">
      <a>Order info</a>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{product}</td>
            <td>{quantity}</td>
            <td>{total}€</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;