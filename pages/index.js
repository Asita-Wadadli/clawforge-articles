import Head from 'next/head';
import { useState, useEffect } from 'react';
import { fetchArticles } from '../lib/api';

export async function getStaticProps() {
  const articles = await fetchArticles();
  return {
    props: { articles }
  };
}

export default function Home({ articles }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedArticle, setExpandedArticle] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleArticle = (id) => {
    if (expandedArticle === id) {
      setExpandedArticle(null);
      // Scroll back to article position
      const element = document.getElementById(`article-${id}`);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setExpandedArticle(id);
    }
  };

  return (
    <>
      <Head>
        <title>Blog — ClawForge</title>
        <meta name="description" content="Thoughts on automation, AI, and building efficient business systems." />
        <link rel="canonical" href="https://clawforge-article-site.vercel.app" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-gray-100">
        {/* Navigation */}
        <nav className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur z-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <a href="https://hemisphere-claw-agency.vercel.app" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">C</span>
              </div>
              <span className="font-semibold">ClawForge</span>
            </a>
            
            {/* Desktop Nav */}
            <div className="hidden sm:flex items-center gap-6">
              <a href="/" className="text-sm font-medium text-gray-900 dark:text-white">Blog</a>
              <a href="https://hemisphere-claw-agency.vercel.app" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Home</a>
              <button
                onClick={toggleTheme}
                className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-1.5 text-gray-500 dark:text-gray-400"
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-gray-500 dark:text-gray-400"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117]">
              <div className="px-4 py-3 space-y-2">
                <a href="/" className="block py-2 text-sm font-medium text-gray-900 dark:text-white">Blog</a>
                <a href="https://hemisphere-claw-agency.vercel.app" className="block py-2 text-sm text-gray-500 dark:text-gray-400">Home</a>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Header */}
          <header className="mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">Blog</h1>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
              Thoughts on automation, AI, and building efficient business systems. 
              {articles.length > 0 && (
                <span className="text-gray-400 dark:text-gray-500"> {articles.length} articles.</span>
              )}
            </p>
          </header>

          {/* Articles List */}
          <div className="space-y-4">
            {articles.length === 0 ? (
              <p className="py-8 text-gray-500 dark:text-gray-500">No articles yet. Check back soon.</p>
            ) : (
              articles.map((article) => {
                const isExpanded = expandedArticle === article.id;
                const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });

                return (
                  <article 
                    key={article.id} 
                    id={`article-${article.id}`}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900"
                  >
                    {/* Article Header - Always Visible */}
                    <div 
                      className="p-4 sm:p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      onClick={() => toggleArticle(article.id)}
                    >
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 leading-snug">
                        {article.title}
                      </h2>
                      
                      {!isExpanded && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                          {article.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                        <span>{formattedDate}</span>
                        <span>·</span>
                        <span>{article.readTime} min read</span>
                        {article.category && (
                          <>
                            <span>·</span>
                            <span className="text-blue-600 dark:text-blue-400">{article.category}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-100 dark:border-gray-800">
                        <div 
                          className="prose prose-sm sm:prose dark:prose-invert max-w-none py-4 prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400"
                          dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }}
                        />
                        
                        {/* Close Button */}
                        <button
                          onClick={() => toggleArticle(article.id)}
                          className="mt-4 inline-flex items-center gap-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                          Close
                        </button>
                      </div>
                    )}

                    {/* Read More Button (when collapsed) */}
                    {!isExpanded && (
                      <div className="px-4 sm:px-6 pb-4">
                        <button
                          onClick={() => toggleArticle(article.id)}
                          className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                        >
                          Read more
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 mt-12 sm:mt-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-500">
              <p>© {new Date().getFullYear()} ClawForge Systems</p>
              <div className="flex items-center gap-4">
                <a href="https://hemisphere-claw-agency.vercel.app" className="hover:text-gray-900 dark:hover:text-white transition-colors">Website</a>
                <a href="https://github.com/Asita-Wadadli" className="hover:text-gray-900 dark:hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}