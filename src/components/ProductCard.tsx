import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useApp();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/shop/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover hover:opacity-75 transition-opacity"
        />
      </Link>
      <div className="p-4">
        <Link
          to={`/shop/${product.id}`}
          className="text-lg font-semibold text-gray-900 hover:text-gray-600"
        >
          {product.name}
        </Link>
        <p className="mt-1 text-gray-500">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
            disabled={!product.inStock}
            className={`flex items-center px-4 py-2 rounded-md ${
              product.inStock
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}