import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const { state } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showInStock, setShowInStock] = useState(false);

  // Get unique categories
  const categories = Array.from(
    new Set(state.products.map((product) => product.category))
  );

  // Filter and sort products
  const filteredProducts = state.products
    .filter((product) => {
      const matchesSearch = state.searchQuery
        ? product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(state.searchQuery.toLowerCase())
        : true;
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesStock = showInStock ? product.inStock : true;

      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return b.featured ? 1 : -1;
      }
    });

  return (
    <>
      <Helmet>
        <title>Shop - ModernBlog</title>
        <meta
          name="description"
          content="Browse our collection of premium products"
        />
      </Helmet>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <Filter className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Category
                </h3>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Price Range
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([+e.target.value, priceRange[1]])
                    }
                    className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], +e.target.value])
                    }
                    className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showInStock}
                    onChange={(e) => setShowInStock(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-900">
                    In Stock Only
                  </span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
            <div className="flex items-center gap-4">
              <SlidersHorizontal className="h-5 w-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}