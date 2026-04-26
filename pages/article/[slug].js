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
      <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Article Not Found</h1>
          <a href="/" style={{ color: '#2563eb' }}>← Back to Blog</a>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Head>
        <title>{article.title} — ClawForge</title>
        <meta name="description" content={article.excerpt} />
      </Head>

      <div style={{ minHeight: '100vh', background: '#fff', color: '#111' }}>
        {/* Navigation */}
        <nav style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <a href="https://hemisphere-claw-agency.vercel.app" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ width: '24px', height: '24px', background: 'linear-gradient(135deg, #3b82f6, #9333ea)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>C</span>
              </div>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>ClawForge</span>
            </a>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <a href="/" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>Blog</a>
              <button
                onClick={toggleTheme}
                style={{ padding: '6px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {darkMode ? (
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Article */}
        <article style={{ maxWidth: '768px', margin: '0 auto', padding: '48px 24px' }}>
          {/* Back Link */}
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#6b7280', textDecoration: 'none', marginBottom: '32px' }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to blog
          </a>

          {/* Header */}
          <header style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111', marginBottom: '16px', lineHeight: 1.2 }}>
              {article.title}
            </h1>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#6b7280' }}>
              <span>{formattedDate}</span>
              <span>·</span>
              <span>{article.readTime} min read</span>
              {article.category && (
                <>
                  <span>·</span>
                  <span style={{ color: '#2563eb' }}>{article.category}</span>
                </>
              )}
            </div>
          </header>

          {/* Content */}
          <div 
            style={{ fontSize: '16px', lineHeight: 1.7, color: '#374151' }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* PDF Download */}
          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #e5e7eb' }}>
            <button
              onClick={downloadPDF}
              disabled={pdfLoading}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '8px 16px', 
                background: '#f3f4f6', 
                color: '#374151', 
                border: 'none', 
                borderRadius: '6px', 
                cursor: pdfLoading ? 'not-allowed' : 'pointer',
                opacity: pdfLoading ? 0.5 : 1,
                fontSize: '14px'
              }}
            >
              {pdfLoading ? (
                <>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }}></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <section style={{ borderTop: '1px solid #e5e7eb', background: '#f9fafb' }}>
            <div style={{ maxWidth: '768px', margin: '0 auto', padding: '48px 24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>More articles</h2>
              <div>
                {relatedArticles.map(related => (
                  <a 
                    key={related.id}
                    href={`/article/${related.slug}/`}
                    style={{ display: 'block', padding: '12px 0', borderBottom: '1px solid #e5e7eb', textDecoration: 'none', color: 'inherit' }}
                  >
                    <h3 style={{ fontWeight: 500, color: '#111', marginBottom: '4px' }}>{related.title}</h3>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{related.excerpt}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer style={{ borderTop: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '768px', margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
            <p>© {new Date().getFullYear()} ClawForge Systems</p>
            <a href="https://hemisphere-claw-agency.vercel.app" style={{ color: '#6b7280', textDecoration: 'none' }}>Website</a>
          </div>
        </footer>
      </div>
    </>
  );
}