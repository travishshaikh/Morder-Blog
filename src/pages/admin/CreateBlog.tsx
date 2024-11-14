import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { useApp } from '../../context/AppContext';
import type { Post } from '../../types';

type BlogFormData = Omit<Post, 'id' | 'createdAt' | 'author'>;

export default function CreateBlog() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const { register, handleSubmit, formState: { errors } } = useForm<BlogFormData>();

  if (!state.user?.isAdmin) {
    navigate('/login');
    return null;
  }

  const onSubmit = (data: BlogFormData) => {
    const newPost: Post = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      author: {
        id: state.user!.id,
        name: state.user!.name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(state.user!.name)}`,
        bio: 'Content Creator',
        social: {}
      },
      tags: data.tags.split(',').map(tag => tag.trim())
    };

    dispatch({ type: 'ADD_POST', payload: newPost });
    navigate('/blog');
  };

  return (
    <>
      <Helmet>
        <title>Create New Blog Post - ModernBlog</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Blog Post</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-lg shadow-md p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              {...register('title', { required: 'Title is required' })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
            <textarea
              {...register('excerpt', { required: 'Excerpt is required' })}
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              {...register('content', { required: 'Content is required' })}
              rows={10}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
            <input
              {...register('tags', { required: 'At least one tag is required' })}
              placeholder="design, tutorial, web"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags.message}</p>}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
}