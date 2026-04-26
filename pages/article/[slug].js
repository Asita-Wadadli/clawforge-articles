import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ShareButtons from '../../components/ShareButtons';
import AuthorBio from '../../components/AuthorBio';
import ArticleCard from '../../components/ArticleCard';
import { fetchArticleBySlug, fetchArticles } from '../../lib/api';

export default function ArticlePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (!slug) return;

    const loadArticle = async () => {
      try {
        const articleData = await fetchArticleBySlug(slug);
        setArticle(articleData);

        // Fetch related articles (exclude current)
        const allArticles = await fetchArticles();
        const related = allArticles
          .filter(a => a.id !== articleData.id)
          .slice(0, 3);
        setRelatedArticles(related);
      } catch (error) {
        console.error('Failed to load article:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="animate-pulse max-w-4xl mx-auto px-4 py-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8" />
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl mb-8" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The article you're looking for doesn't exist.</p>
          <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">← Back to Articles</a>
        </div>
      </div>
    );
  }

  const articleUrl = `https://hemisphere-claw-agency.vercel.app/article/${slug}/`;

  return (
    <>
      <Head>
        <title>{article.title} | ClawForge</title>
        <meta name="description" content={article.excerpt} />
        <meta name="keywords" content={article.tags?.join(', ') || 'automation, AI, business'} />
        <meta name="author" content={article.author?.name} />
        
        {/* Open Graph */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        {article.heroImage && <meta property="og:image" content={article.heroImage} />}
        <meta property="article:published_time" content={article.publishedAt} />
        <meta property="article:author" content={article.author?.name} />
        {article.tags?.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        {article.heroImage && <meta name="twitter:image" content={article.heroImage} />}
        
        {/* Canonical */}
        <link rel="canonical" href={articleUrl} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: article.title,
              description: article.excerpt,
              image: article.heroImage,
              datePublished: article.publishedAt,
              dateModified: article.updatedAt || article.publishedAt,
              author: {
                '@type': 'Person',
                name: article.author?.name,
              },
              publisher: {
                '@type': 'Organization',
                name: 'ClawForge',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://hemisphere-claw-agency.vercel.app/logo.png',
                },
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': articleUrl,
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CF</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">ClawForge</span>
              </a>

              <nav className="hidden md:flex items-center space-x-8">
                <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Articles</a>
                <a href="/#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
                <a href="/#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
              </nav>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="/" className="hover:text-blue-600 transition-colors">Home</a></li>
              <li>/</li>
              <li><a href="/" className="hover:text-blue-600 transition-colors">Articles</a></li>
              <li>/</li>
              <li className="text-gray-900 dark:text-gray-200 truncate max-w-xs">{article.title}</li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            {article.category && (
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
                {article.category}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              {article.author && (
                <div className="flex items-center space-x-2">
                  {article.author.avatar ? (
                    <img src={article.author.avatar} alt={article.author.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {article.author.name?.charAt(0)}
                    </div>
                  )}
                  <span className="font-medium text-gray-900 dark:text-gray-200">{article.author.name}</span>
                </div>
              )}
              <span>•</span>
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {article.readTime && (
                <>
                  <span>•</span>
                  <span>{article.readTime} min read</span>
                </>
              )}
            </div>
          </header>

          {/* Hero Image */}
          {article.heroImage && (
            <div className="mb-8">
              <img
                src={article.heroImage}
                alt={article.title}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          )}

          {/* Share Buttons */}
          <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
            <ShareButtons url={articleUrl} title={article.title} />
          </div>

          {/* Article Body */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Buttons (Bottom) */}
          <div className="mb-12">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Share this article:</p>
            <ShareButtons url={articleUrl} title={article.title} />
          </div>

          {/* PDF Download */}
          <div className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 12h8v2H8v-2zm0 4h8v2H8v-2zm0-8h3v2H8V8z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Download PDF</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Save this article for offline reading</p>
                </div>
              </div>
              <button
                onClick={downloadPDF}
                disabled={pdfLoading}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {pdfLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Author Bio */}
          {article.author && (
            <div className="mb-12">
              <AuthorBio author={article.author} />
            </div>
          )}
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-gray-50 dark:bg-gray-800/50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map(related => (
                  <ArticleCard key={related.id} article={related} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">CF</span>
                  </div>
                  <span className="text-xl font-bold text-white">ClawForge</span>
                </div>
                <p className="text-sm max-w-sm">
                  Building a more efficient future through automation and AI. 
                  Empowering businesses to scale smarter.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="hover:text-white transition-colors">Articles</a></li>
                  <li><a href="/#about" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="/#contact" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Connect</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-sm text-center">
              © {new Date().getFullYear()} ClawForge. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}