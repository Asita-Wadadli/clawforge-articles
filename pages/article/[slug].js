import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchArticleBySlug, fetchArticles } from '../../lib/api';

export async function getStaticPaths() {
  const articles = await fetchArticles();
  const paths = articles.map(article => ({
    params: { slug: article.slug }
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const article = await fetchArticleBySlug(params.slug);
  const allArticles = await fetchArticles();
  
  if (!article) {
    return { notFound: true };
  }
  
  const relatedArticles = allArticles
    .filter(a => a.id !== article.id)
    .slice(0, 3);
    
  return {
    props: { article, relatedArticles }
  };
}

export default function ArticlePage({ article, relatedArticles }) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const downloadPDF = async () => {
    if (!article) return;
    
    setPdfLoading(true);
    try {
      const response = await fetch(`/api/articles/${article.id}/pdf`);
      
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${article.slug || 'article'}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('PDF download error:', error);
      alert('Failed to download PDF. Please try again later.');
    } finally {
      setPdfLoading(false);
    }
  };

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0d1117] flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0d1117] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h1>
          <a href="/" className="text-blue-600 hover:text-blue-700">← Back to Blog</a>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Get full content - try different properties
  const fullContent = article.content?.body || article.content || article.description || '';

  return (
    <>
      <Head>
        <title>{article.title} — ClawForge Blog</title>
        <meta name="description" content={article.excerpt} />
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

        {/* Article */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Back Link */}
          <a href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to blog
          </a>

          {/* Header */}
          <header className="mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-gray-500 dark:text-gray-400">
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
          </header>

          {/* Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: fullContent }}
          />

          {/* If no content, show excerpt as fallback */}
          {(!fullContent || fullContent === article.excerpt) && (
            <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Full article content loading... If this persists, please refresh the page.
              </p>
            </div>
          )}

          {/* PDF Download */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={downloadPDF}
              disabled={pdfLoading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors text-sm"
            >
              {pdfLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#161b22]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
              <h2 className="text-lg font-semibold mb-6">More articles</h2>
              <div className="space-y-1">
                {relatedArticles.map(related => (
                  <a 
                    key={related.id}
                    href={`/article/${related.slug}/`}
                    className="block py-3 border-b border-gray-200 dark:border-gray-800 last:border-0 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white">{related.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{related.excerpt}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-500">
              <p>© {new Date().getFullYear()} ClawForge Systems</p>
              <a href="https://hemisphere-claw-agency.vercel.app" className="hover:text-gray-900 dark:hover:text-white transition-colors">Website</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}