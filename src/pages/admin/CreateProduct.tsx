import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { useApp } from '../../context/AppContext';
import type { Product } from '../../types';

type ProductFormData = Omit<Product, 'id'>;

export default function CreateProduct() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>();

  if (!state.user?.isAdmin) {
    navigate('/login');
    return null;
  }

  const onSubmit = (data: ProductFormData) => {
    const newProduct: Product = {
      ...data,
      id: crypto.randomUUID(),
      price: Number(data.price)
    };

    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    navigate('/shop');
  };

  return (
    <>
      <Helmet>
        <title>Add New Product - ModernBlog Shop</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-lg shadow-md p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              {...register('name', { required: 'Product name is required' })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              {...register('price', {
                required: 'Price is required',
                min: { value: 0, message: 'Price must be positive' }
              })}
              type="number"
              step="0.01"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              {...register('image', { required: 'Image URL is required' })}
              type="url"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <input
              {...register('category', { required: 'Category is required' })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
          </div>

          <div className="flex items-center gap-4">
            <input
              {...register('inStock')}
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="text-sm font-medium text-gray-700">In Stock</label>
          </div>

          <div className="flex items-center gap-4">
            <input
              {...register('featured')}
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="text-sm font-medium text-gray-700">Featured Product</label>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}