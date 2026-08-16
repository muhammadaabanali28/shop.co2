import { useState } from 'react';
import Home from './pages/home';
import Category from './pages/Category';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  const [page, setPage] = useState('home');

  const navigateTo = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (page === 'login') {
    return <Login onChangePage={navigateTo} />;
  }

  if (page === 'signup') {
    return <Signup onChangePage={navigateTo} />;
  }

  return (
    <>
      {page === 'home' ? (
        <Home onChangePage={navigateTo} />
      ) : (
        <Category onChangePage={navigateTo} />
      )}
    </>
  );
}

export default App;
