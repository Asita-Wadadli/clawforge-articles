import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchArticleBySlug, fetchArticles } from '../../lib/api';

// Full article content
const articleContent = {
  '5-minute-invoice-hack-get-paid-3x-faster': `
    <h2>The Hidden Cost of Slow Invoicing</h2>
    <p>Every day you wait to send an invoice, your chances of getting paid drop by 5%. After 30 days, you're essentially giving out interest-free loans to your clients.</p>
    <h2>The 5-Minute Solution</h2>
    <p>ClawInvoice Pro automates your entire invoicing workflow: auto-generate invoices, send payment reminders, track payment status, and accept online payments instantly.</p>
    <h2>Real Results</h2>
    <p>Businesses using automated invoicing get paid 3x faster on average. That means if you currently wait 45 days to get paid, you could be receiving payment in just 15 days.</p>
  `,
  'quote-process-costing-10k-month-ai-fix': `
    <h2>The $10K You're Leaving on the Table</h2>
    <p>Every hour you spend creating quotes is an hour you're not billing clients. If you create 10 quotes per week and each takes 30 minutes, that's 5 hours of lost revenue.</p>
    <h2>The AI Fix</h2>
    <p>Instant Quote Engine Pro generates professional quotes in under 60 seconds with templates, auto-calculated pricing, branded PDF delivery, and follow-up sequences.</p>
  `,
  'automated-80-percent-admin-work-30-days': `
    <h2>The Admin Work Trap</h2>
    <p>Most small business owners spend 40% of their time on administrative tasks that don't generate revenue but consume your most valuable resource: time.</p>
    <h2>The 30-Day Transformation</h2>
    <p>Use ClawForge Suite to automate email responses, data entry, appointment scheduling, and invoice generation. Reclaim 20+ hours per week.</p>
  `,
  'ai-chatbots-dead-whats-replacing-them-2026': `
    <h2>Why Chatbots Failed</h2>
    <p>Traditional chatbots were rigid, frustrating, and couldn't handle complex conversations. Customers hated them.</p>
    <h2>Enter AI Avatars</h2>
    <p>The next generation uses natural language understanding, visual presence, emotional intelligence, and continuous learning.</p>
  `,
  '47-dollar-tool-eliminated-2000-virtual-assistant': `
    <h2>The $24,000 Question</h2>
    <p>I was paying $2,000/month for a virtual assistant. That's $24,000 per year — my second-largest expense.</p>
    <h2>The $47 Solution</h2>
    <p>I built a custom automation system using ClawForge Suite that handles email, calendar, CRM, invoices, and follow-ups.</p>
  `,
  '7-ai-automation-tools-every-small-business-needs-2026': `
    <h2>The AI Advantage</h2>
    <p>Small businesses that leverage AI automation are growing 3x faster than those that don't.</p>
    <h2>7 Essential Tools</h2>
    <p>Instant Quote Engine, ClawInvoice Pro, AI Email Assistant, Smart Scheduler, CRM Automation, Document Generator, and Analytics Dashboard.</p>
  `,
  'automated-payment-follow-up-system': `
    <h2>The Payment Chase</h2>
    <p>Chasing unpaid invoices is awkward, time-consuming, and kills cash flow. Yet 67% of small businesses struggle with late payments.</p>
    <h2>The Automated Solution</h2>
    <p>Automated reminders at day 1, 7, 14, and 21 recover 40% more revenue and save 10+ hours per week.</p>
  `
};

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
    props: { 
      article: {
        ...article,
        fullContent: articleContent[article.slug] || article.content || article.excerpt
      }, 
      relatedArticles 
    }
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

  const downloadPDF = () => {
    setPdfLoading(true);
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Please allow popups to download PDF');
        return;
      }
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${article.title}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 800px; margin: 40px auto; padding: 20px; }
            h1 { font-size: 28px; font-weight: 700; margin-bottom: 20px; color: #111; }
            h2 { font-size: 20px; font-weight: 600; margin-top: 30px; margin-bottom: 15px; color: #2563eb; }
            p { margin-bottom: 15px; }
            .header { border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: 700; color: #2563eb; }
            .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">☀️ ClawForge</div>
          </div>
          <h1>${article.title}</h1>
          ${article.fullContent}
          <div class="footer">
            <p>© ${new Date().getFullYear()} ClawForge Systems</p>
            <p>https://clawforge.com</p>
          </div>
          <script>window.print();</script>
        </body>
        </html>
      `);
      printWindow.document.close();
    } catch (error) {
      console.error('PDF download error:', error);
      alert('Failed to open PDF. Please try again.');
    } finally {
      setPdfLoading(false);
    }
  };

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
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

  return (
    <>
      <Head>
        <title>{article.title} — ClawForge Blog</title>
        <meta name="description" content={article.excerpt} />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Navigation */}
        <nav className="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-50 shadow-sm" style={{ position: 'fixed', width: '100%', top: 0 }}>
          <div className="max-w-3xl mx-auto px-4" style={{ height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Logo */}
            <a href="https://hemisphere-claw-agency.vercel.app" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #2563eb, #9333ea)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>C</span>
              </div>
              <span style={{ fontWeight: 'bold', color: 'inherit' }}>ClawForge</span>
            </a>
            
            {/* Desktop Nav */}
            <div className="hidden sm:flex" style={{ alignItems: 'center', gap: '24px' }}>
              <a href="/" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>Blog</a>
              <a href="https://hemisphere-claw-agency.vercel.app" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>Home</a>
              <button
                onClick={toggleTheme}
                style={{ padding: '8px', borderRadius: '8px', background: '#f3f4f6', border: 'none', cursor: 'pointer' }}
                aria-label="Toggle theme"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>

            {/* Mobile Menu Button - ALWAYS VISIBLE ON MOBILE */}
            <div className="sm:hidden" style={{ display: 'flex', alignItems: 'center' }}>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ 
                  padding: '10px', 
                  borderRadius: '8px', 
                  background: 'linear-gradient(135deg, #2563eb, #9333ea)', 
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
                aria-label="Menu"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="sm:hidden" style={{ borderTop: '1px solid #e5e7eb', background: 'white', padding: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="/" style={{ padding: '12px', color: '#374151', textDecoration: 'none', borderRadius: '6px' }} onClick={() => setMobileMenuOpen(false)}>Blog</a>
                <a href="https://hemisphere-claw-agency.vercel.app" style={{ padding: '12px', color: '#374151', textDecoration: 'none', borderRadius: '6px' }} onClick={() => setMobileMenuOpen(false)}>Home</a>
                <button
                  onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
                  style={{ padding: '12px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: '#374151' }}
                >
                  {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Spacer for fixed nav */}
        <div style={{ height: '56px' }}></div>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-4 py-8">
          {/* Back Link */}
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#6b7280', textDecoration: 'none', marginBottom: '24px' }}>
            ← Back to blog
          </a>

          {/* Header */}
          <header style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'inherit', marginBottom: '16px', lineHeight: 1.3 }}>
              {article.title}
            </h1>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280' }}>
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
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div 
              style={{ lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: article.fullContent }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <button
              onClick={downloadPDF}
              disabled={pdfLoading}
              style={{ 
                padding: '12px 24px', 
                background: 'linear-gradient(135deg, #2563eb, #9333ea)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: pdfLoading ? 'not-allowed' : 'pointer',
                opacity: pdfLoading ? 0.7 : 1,
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              {pdfLoading ? 'Opening...' : 'Download PDF'}
            </button>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section style={{ borderTop: '1px solid #e5e7eb', background: 'white', marginTop: '48px' }}>
            <div className="max-w-3xl mx-auto px-4 py-8">
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>More articles</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {relatedArticles.map(related => (
                  <a 
                    key={related.id}
                    href={`/article/${related.slug}/`}
                    style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}
                  >
                    <h3 style={{ fontWeight: '600', marginBottom: '4px' }}>{related.title}</h3>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>{related.excerpt}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer style={{ borderTop: '1px solid #e5e7eb', background: 'white', marginTop: '48px' }}>
          <div className="max-w-3xl mx-auto px-4 py-8">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', background: 'linear-gradient(135deg, #2563eb, #9333ea)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>C</span>
                </div>
                <span style={{ fontWeight: '600', color: 'inherit' }}>ClawForge</span>
              </div>
              <p>© {new Date().getFullYear()} ClawForge Systems</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}