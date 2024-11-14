import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const Shop = React.lazy(() => import('./pages/Shop'));
const Product = React.lazy(() => import('./pages/Product'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Login = React.lazy(() => import('./pages/Login'));
const CreateBlog = React.lazy(() => import('./pages/admin/CreateBlog'));
const CreateProduct = React.lazy(() => import('./pages/admin/CreateProduct'));

export default function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <React.Suspense
              fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              }
            >
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/new" element={<CreateBlog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/shop/new" element={<CreateProduct />} />
                  <Route path="/shop/:id" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </main>
            </React.Suspense>
          </div>
        </BrowserRouter>
      </AppProvider>
    </HelmetProvider>
  );
}