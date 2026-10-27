import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { Navbar } from './ProductList';

function CartItem({ onNav }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity <= 1) dispatch(removeItem(item.name));
    else dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
  };

  const handleRemove = (item) => dispatch(removeItem(item.name));

  const handleContinueShopping = (event) => {
    event.preventDefault();
    onNav('plants');
  };

  return (
    <div>
      <Navbar onNav={onNav} />
      <main className="cart cart-container">
        <h2>Shopping Cart</h2>
        {items.length === 0 && <p>Your cart is empty. Browse the plants to add some.</p>}
        {items.map((item) => (
          <div className="cart-row" key={item.name}>
            <img src={item.image} alt={item.name} />
            <div className="cart-info">
              <h3>{item.name}</h3>
              <p>Unit price: ${item.cost.toFixed(2)}</p>
              <div className="qty">
                <button className="btn btn-success" aria-label={`Decrease ${item.name}`} onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button className="btn btn-success" aria-label={`Increase ${item.name}`} onClick={() => handleIncrement(item)}>+</button>
              </div>
              <p>Item total: ${(item.cost * item.quantity).toFixed(2)}</p>
            </div>
            <button className="btn btn-danger cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
          </div>
        ))}
        <h3 className="cart-total">Total cart amount: ${total.toFixed(2)}</h3>
        <div className="cart-actions">
          <button className="btn btn-primary get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
          <button className="btn btn-success" onClick={() => window.alert('Coming Soon')}>Checkout</button>
        </div>
      </main>
    </div>
  );
}

export default CartItem;
