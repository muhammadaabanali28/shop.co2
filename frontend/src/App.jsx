import { useState } from 'react';
import Home from './pages/home';
import Category from './pages/Category';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const [section, setSection] = useState('shop');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  const navigateTo = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateSection = (sectionName) => {
    setSection(sectionName);
    setPage('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProduct = (product, products) => {
    setSelectedProduct(product);
    if (products) setAllProducts(products);
    setPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (page === 'login') {
    return <Login onChangePage={navigateTo} onChangeSection={navigateSection} />;
  }

  if (page === 'signup') {
    return <Signup onChangePage={navigateTo} onChangeSection={navigateSection} />;
  }

  if (page === 'cart') {
    return <Cart onChangePage={navigateTo} onChangeSection={navigateSection} />;
  }

  if (page === 'product' && selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onChangePage={navigateTo}
        onChangeSection={navigateSection}
        allProducts={allProducts}
      />
    );
  }

  if (page === 'category') {
    return (
      <Category
        section={section}
        onChangePage={navigateTo}
        onChangeSection={navigateSection}
        onProductClick={openProduct}
      />
    );
  }

  return (
    <Home onChangePage={navigateTo} onChangeSection={navigateSection} onProductClick={openProduct} />
  );
}

export default App;
