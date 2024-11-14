import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Product() {
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const product = state.products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Product not found
        </h1>
        <Link
          to="/shop"
          className="text-blue-600 hover:text-blue-800 inline-flex items-center"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} - ModernBlog Shop</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <Link
          to="/shop"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <p className="text-gray-600 mb-8">{product.description}</p>

            <button
              onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
              disabled={!product.inStock}
              className={`w-full flex items-center justify-center px-8 py-4 rounded-lg text-lg font-medium ${
                product.inStock
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="h-6 w-6 mr-2" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {product.inStock && (
              <p className="text-sm text-gray-500 mt-4 text-center">
                Free shipping on orders over $50
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}