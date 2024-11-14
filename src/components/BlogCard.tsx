import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import type { Post } from '../types';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link to={`/blog/${post.id}`} className="block relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </Link>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          to={`/blog/${post.id}`}
          className="block mt-2 text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
        >
          {post.title}
        </Link>
        <p className="mt-3 text-gray-600 line-clamp-2">{post.excerpt}</p>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-10 w-10 rounded-full border-2 border-white shadow-sm"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>
          <Link
            to={`/blog/${post.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}