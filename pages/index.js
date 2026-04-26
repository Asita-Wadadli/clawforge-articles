import Head from 'next/head';
import { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import { fetchArticles } from '../lib/api';

export async function getStaticProps() {
  const articles = await fetchArticles();
  return {
    props: { articles }
  };
}

export default function Home({ articles }) {
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <>
      <Head>
        <title>Blog — ClawForge</title>
        <meta name="description" content="Thoughts on automation, AI, and building efficient business systems." />
        <link rel="canonical" href="https://clawforge-article-site.vercel.app" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-gray-100">
        {/* Navigation */}
        <nav className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
            <a href="https://hemisphere-claw-agency.vercel.app" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">C</span>
              </div>
              <span className="font-semibold text-sm">ClawForge</span>
            </a>
            
            <div className="flex items-center gap-6">
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
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto px-6 py-12">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-3xl font-bold mb-3">Blog</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Thoughts on automation, AI, and building efficient business systems. 
              {articles.length > 0 && (
                <span className="text-gray-400 dark:text-gray-500"> {articles.length} articles.</span>
              )}
            </p>
          </header>

          {/* Articles List */}
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {articles.length === 0 ? (
              <p className="py-8 text-gray-500 dark:text-gray-500">No articles yet. Check back soon.</p>
            ) : (
              articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
          <div className="max-w-3xl mx-auto px-6 py-8">
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