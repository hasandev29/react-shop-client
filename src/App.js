import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './pages/Layout';
import { Home } from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import ScrollToTop from './ScrollToTop';
import { styled } from 'styled-components';
import { Product } from './pages/Product';

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${props => props.color || '#000'};

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;



function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='products/:category' element={<ProductList />} />
          <Route path='cart' element={<Navigate to="/" />} />
          <Route path='product/:id' element={<Product />} />

          <Route path='*' element={<div>No Element found</div>} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
