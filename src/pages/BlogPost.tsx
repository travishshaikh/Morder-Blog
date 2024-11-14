import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Twitter, Linkedin, Github } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BlogPost() {
  const { id } = useParams();
  const { state } = useApp();
  const post = state.posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Article not found
        </h1>
        <Link
          to="/blog"
          className="text-blue-600 hover:text-blue-800 inline-flex items-center"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - ModernBlog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article className="max-w-4xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Blog
        </Link>

        <img
          src={post.image}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />

        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-4">
                <p className="text-lg font-medium text-gray-900">
                  {post.author.name}
                </p>
                <p className="text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {post.author.social.twitter && (
                <a
                  href={post.author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {post.author.social.linkedin && (
                <a
                  href={post.author.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {post.author.social.github && (
                <a
                  href={post.author.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-900"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          {post.content}
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-16 w-16 rounded-full"
            />
            <div className="ml-4">
              <h2 className="text-lg font-bold text-gray-900">
                About {post.author.name}
              </h2>
              <p className="text-gray-600 mt-1">{post.author.bio}</p>
            </div>
          </div>
        </footer>
      </article>
    </>
  );
}