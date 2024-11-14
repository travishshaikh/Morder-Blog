import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';

export default function Home() {
  const { state } = useApp();
  const featuredPosts = state.posts.slice(0, 3);
  const featuredProducts = state.products.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      <Helmet>
        <title>ModernBlog - Home</title>
        <meta
          name="description"
          content="Discover amazing articles and premium products at ModernBlog"
        />
      </Helmet>

      <section className="mb-16">
        <HeroSlider />
      </section>

      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Latest Articles
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our collection of thought-provoking content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            View all articles
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/shop"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            View all products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="bg-blue-600 text-white rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and get access to exclusive content, special
          offers, and early access to new products.
        </p>
        <form className="max-w-md mx-auto">
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-gray-900"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 font-medium"
            >
              Subscribe
            </button>
          </div>
        </form>
      </section>
    </>
  );
}