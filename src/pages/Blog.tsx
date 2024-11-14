import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BlogCard from '../components/BlogCard';

export default function Blog() {
  const { state } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get unique categories and tags
  const categories = Array.from(
    new Set(state.posts.map((post) => post.category))
  );
  const tags = Array.from(
    new Set(state.posts.flatMap((post) => post.tags))
  );

  // Filter posts based on search, category, and tags
  const filteredPosts = state.posts.filter((post) => {
    const matchesSearch = state.searchQuery
      ? post.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(state.searchQuery.toLowerCase())
      : true;
    const matchesCategory = selectedCategory
      ? post.category === selectedCategory
      : true;
    const matchesTags =
      selectedTags.length > 0
        ? selectedTags.every((tag) => post.tags.includes(tag))
        : true;

    return matchesSearch && matchesCategory && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <>
      <Helmet>
        <title>Blog - ModernBlog</title>
        <meta
          name="description"
          content="Explore our collection of insightful articles and stories"
        />
      </Helmet>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
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
              <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-gray-600">
              {filteredPosts.length} articles{' '}
              {(selectedCategory || selectedTags.length > 0) && '(filtered)'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No articles found matching your criteria.
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}