import { useState, useEffect } from 'react';
import Home from './pages/home';
import Category from './pages/Category';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { api, IMG_BASE } from './services/api';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const [section, setSection] = useState('shop');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api.getProducts();
        const withUrls = data.map((p) => ({
          ...p,
          image: p.image && !p.image.startsWith("http") ? IMG_BASE + p.image : p.image,
        }));
        setProducts(withUrls);
      } catch (err) {
        console.log("Products fetch error:", err.message);
      }
    };

    loadProducts();
  }, []);

  const navigateTo = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateSection = (sectionName) => {
    setSection(sectionName);
    setPage('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
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

  if (page === 'checkout') {
    return <Checkout onChangePage={navigateTo} onChangeSection={navigateSection} />;
  }

  if (page === 'product' && selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onChangePage={navigateTo}
        onChangeSection={navigateSection}
        allProducts={products}
        onProductClick={openProduct}
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
        products={products}
      />
    );
  }

  return (
    <Home
      onChangePage={navigateTo}
      onChangeSection={navigateSection}
      onProductClick={openProduct}
      products={products}
    />
  );
}

export default App;
