import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const img = (text) => `https://placehold.co/160x160/2f6b4f/ffffff?text=${encodeURIComponent(text)}`;
const make = (plants) => plants.map(([name, cost, description]) => ({ name, cost, description, image: img(name) }));

const categories = [
  { title: 'Air Purifying Plants', plants: make([
    ['Snake Plant', 15, 'Easy-care upright leaves'], ['Spider Plant', 12, 'Fast-growing favourite'],
    ['Peace Lily', 18, 'Elegant white blooms'], ['Rubber Plant', 22, 'Glossy, bold leaves'],
    ['Boston Fern', 14, 'Lush green fronds'], ['Areca Palm', 30, 'Tropical indoor style']
  ])},
  { title: 'Succulents', plants: make([
    ['Aloe Vera', 10, 'Sun-loving succulent'], ['Jade Plant', 13, 'Long-lived lucky plant'],
    ['Echeveria', 9, 'Compact rosette shape'], ['Haworthia', 8, 'Distinctive striped leaves'],
    ['String of Pearls', 16, 'Trailing bead-like stems'], ['Burros Tail', 15, 'Great for hanging baskets']
  ])},
  { title: 'Low Light Plants', plants: make([
    ['ZZ Plant', 20, 'Tolerates low light'], ['Pothos', 11, 'Trailing and forgiving'],
    ['Cast Iron Plant', 24, 'Hardy indoor foliage'], ['Chinese Evergreen', 17, 'Decorative patterned leaves'],
    ['Philodendron', 14, 'Heart-shaped leaves'], ['Dracaena', 26, 'Tall architectural plant']
  ])}
];

export function Navbar({ onNav }) {
  const count = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
  return (
    <nav className="navbar">
      <span className="brand">Paradise Nursery</span>
      <div className="nav-links">
        <button onClick={() => onNav('home')}>Home</button>
        <button onClick={() => onNav('plants')}>Plants</button>
        <button onClick={() => onNav('cart')} aria-label={`Cart, ${count} items`}>
          🛒 Cart <span className="cart-count cart_quantity_count">{count}</span>
        </button>
      </div>
    </nav>
  );
}

function ProductList({ onNav }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const addedToCart = Object.fromEntries(items.map((item) => [item.name, true]));

  return (
    <div>
      <Navbar onNav={onNav} />
      <main className="products">
        {categories.map((category) => (
          <section key={category.title}>
            <h2>{category.title}</h2>
            <div className="product-list">
              {category.plants.map((plant) => (
                <div className="card" key={plant.name}>
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p className="desc">{plant.description}</p>
                  <p className="price">${plant.cost.toFixed(2)}</p>
                  <button
                    className="btn btn-primary"
                    disabled={!!addedToCart[plant.name]}
                    onClick={() => dispatch(addItem(plant))}
                  >
                    {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
