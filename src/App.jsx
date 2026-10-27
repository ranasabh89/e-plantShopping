import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';

function App() {
  const [page, setPage] = useState('home');
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
    setPage('plants');
  };

  const handleNavigation = (nextPage) => {
    setPage(nextPage);
    setShowProductList(nextPage === 'plants');
  };

  if (page === 'cart') return <CartItem onNav={handleNavigation} />;
  if (showProductList || page === 'plants') return <ProductList onNav={handleNavigation} />;

  return (
    <div className="app-container background-image">
      <div className="landing-overlay">
        <h1>Welcome to Paradise Nursery</h1>
        <p>Healthy houseplants, delivered to your door.</p>
        <button className="btn btn-primary get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
        <AboutUs />
      </div>
    </div>
  );
}

export default App;
